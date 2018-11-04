// External Imports
// import * as express from 'express';
import * as jwtMiddleware from 'express-jwt';
// import * as qs from 'querystring';
import * as rp from 'request-promise';
import * as bcrypt from 'bcrypt';
// import * as googleapi from "googleapis";
import { Request, Response, Router } from 'express';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { hashSync          } from 'bcrypt';

// Shared Imports
// import { Appointment } from '../../models/appointments';
// import { ITokenUser  } from '../../models/user';
import { AuthenticationError } from '../../models/exception';

// Project imports
import { ILoginData, IGoogleProfile } from '../interfaces';
import { UserModel   } from '../domain/users';
import { validateAsync, loginValidationSchema, isValidationError, toTokenUser,
    RequestWithUser, sendTokenAsync } from '../helpers';
import { config } from '../config';
// import { not } from 'joi';
class AuthRouter {

    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }
    public async login(request: Request, response: Response): Promise<Response> {
        try {
            const login: ILoginData = await validateAsync(request.body, loginValidationSchema);
            const user = await UserModel.findOneByUsername(login.username);

            if (!user || !user.password) { // user does not have a password, only google account
                return response.status(401).send('Bad username or password');
            }

            const passwordMatch = await bcrypt.compare(login.password, user.password);
            if (!passwordMatch) {
                return response.status(401).send('Bad username or password');
            }
            return await sendTokenAsync(response, toTokenUser(user));
        } catch (err) {
            if (err instanceof Error && isValidationError(err)) {
                // issue with joi type definition
                console.log((<any>err).annotate());
                return response.sendStatus(422);
            }
            console.error(err);
            return response.sendStatus(500);
        }
    }

    public async loginWithGoogle(req: RequestWithUser, res: Response): Promise<Response> {
        try {
            const accessTokenUrl    = 'https://www.googleapis.com/oauth2/v4/token';
            const peopleApiUrl      = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

            const { code } = req.body.oauthData;
            const { client_id, redirect_uri } = req.body.authorizationData;
            const params = {
                code,
                client_id,
                client_secret: config.auth.GOOGLE_SECRET,
                redirect_uri,
                grant_type: 'authorization_code'
            };
            // Step 1. Exchange authorization code for access token.
            const { access_token } = await rp.post(accessTokenUrl, { json: true, form: params });
            const headers = { Authorization: `Bearer ${access_token}` };

            // Step 2. Retrieve profile information about the current user.
            const profile: IGoogleProfile = await rp.get({ url: peopleApiUrl, json: true, headers });
            if (profile.error) {
                console.log(profile.error);
                throw profile.error;
            }

            const userExists = await UserModel.findOneByGoogleId(profile.sub);
            if (userExists) {
                const existingUser = new UserModel();
                existingUser.google_access_token = access_token;

                const newUser = await existingUser.save();
                return await sendTokenAsync(res, toTokenUser(newUser));

                // User exists. Update access token
                // userExists.
                // if (req.user) {
                //     return res.status(409).send('Google profile already linked');
            // }
                /*const user = await dbUpdateUser(req.user.username, {
                    google: profile.sub,
                    picture: profile.picture.replace('sz=50', 'sz=200'),
                    displayName: req.user.displayName || profile.name
                });
                return await sendTokenAsync(res, toTokenUser(user));*/
            } else {
                const pass = hashSync('testtest', config.auth.SALT_ROUNDS);
                const newUser = new UserModel({
                    username: profile.sub,
                    password: pass,
                    google_access_token: access_token,
                    google_sub: profile.sub,
                    lastUpdated: '2018/01/01'
                });
                newUser.save();
                return await sendTokenAsync(res, toTokenUser(newUser));
            }
        } catch (err) {
            const authException    = new AuthenticationError();
            authException.detail = err.message;
            authException.stack  = err.stack;

            return res.status(401).send(authException);
        }
    }
    public async ping(request: Request, response: Response) {
        const result = {
            data: 'Ping correctly executed'
        };

        return response.json(result);
    }

    // set up our routes
    public routes() {
        this.router.post('/login', this.login);
        this.router.post('/google', this.loginWithGoogle);
        this.router.get('/ping', this.ping);
        this.router.use(jwtMiddleware({
            secret: config.auth.TOKEN_SECRET,
            credentialsRequired: false
        }));
    }
  }

  const authRoutes = new AuthRouter();
  const router = authRoutes.router;

  export default router;


