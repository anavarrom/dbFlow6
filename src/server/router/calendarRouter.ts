// External Imports
// import * as express from 'express';
import * as jwtMiddleware from 'express-jwt';
import { Request, Response, Router } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
// import {
//     PaginateOptions,
//     PaginateResult,
// } from 'mongoose';

// Shared Imports
// import { Appointment } from '../../../models/appointments'
import { ITokenUser  } from '../../models/user';

// import { Exception,
//          InternalServerError,
//          AuthenticationError,
//          AuthorizationError
// } from '../../../models/exception'

// Project imports
import { UserModel   } from '../domain/users';
import { AppointmentModel    } from '../domain/appointments';
import { verifyTokenAsync    } from '../helpers';
import { config              } from '../config';
// import { not } from 'joi';

export class CalendarRouter {

    public router: Router;
    constructor() {
      this.router = Router();
      this.routes();
    }
    public async allAppointments(request: Request, response: Response): Promise<Response> {
        try {
            const authorization = request.header('Authorization');
            if (!authorization || !authorization.includes(' ')) {
                return response.status(401).send('No Token');
            }
            const encodedToken = authorization.split(' ')[1];
            const token: ITokenUser & { exp: number } =
                await verifyTokenAsync(encodedToken, config.auth.TOKEN_SECRET, { ignoreExpiration: true });

            // let notification: iNotification  = request.body;
            const user     = await UserModel.findOneByUsername(token.username);
            const events   = await AppointmentModel.find().where('user', user._id);
            response.json(events);
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return response.status(400).send('Invalid Token');
            }
            console.error(err);
            return response.sendStatus(500);
        }
    }
    // set up our routes
    public routes() {
     this.router.get('/allAppointments', this.allAppointments);
     this.router.use(jwtMiddleware({
         secret: config.auth.TOKEN_SECRET,
         credentialsRequired: false
     }));
    }
  }

  const calendarRoutes = new CalendarRouter();
  const router = calendarRoutes.router;

  export default router;


