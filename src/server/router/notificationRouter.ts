// External Imports
// import * as express from 'express';
import * as jwtMiddleware from 'express-jwt';
import { Request, Response, Router } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import {
    PaginateOptions,
    PaginateResult,
} from 'mongoose';

// Shared Imports
import { Notification, INotification, NotificationStatus } from '../../models/notification';
import { ITokenUser } from '../../models/user';
import { InternalServerError,
         AuthenticationError,
         AuthorizationError
} from '../../models/exception';

// Project imports
import { UserModel   } from '../domain/users';
import { NotificationModel, IDBNotification    } from '../domain/notifications';
import { AppointmentModel    } from '../domain/appointments';
import { verifyTokenAsync    } from '../helpers';
import { config              } from '../config';
import { SolRServices        } from '../services/solrServices';

// import { not } from 'joi';


export class NotificationRouter {

    public router: Router;

    constructor() {
      this.router = Router();
      this.routes();
    }

    public async pageNotifications(request: Request, response: Response) {
        try {
            const authorization = request.header('Authorization');
            if (!authorization || !authorization.includes(' ')) {
                return response.status(401).send('No Token');
            }
            const encodedToken = authorization.split(' ')[1];
            const token: ITokenUser & { exp: number } =
                await verifyTokenAsync(encodedToken, config.auth.TOKEN_SECRET, { ignoreExpiration: true });

            const options: PaginateOptions = request.body;

            const user = await UserModel.findOneByUsername(token.username);

            NotificationModel.paginate({}, options, (err: any, value: PaginateResult<Notification>) => {
                if (err) {
                    const error = new InternalServerError(err);
                    return response.status(500).send(error);
                }
                return response.json(value);
            });
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return response.status(400).send('Invalid Token');
            }
            console.error(err);
            return response.sendStatus(500);
        }
    }

    public async addNotification(request: Request, response: Response) {

        try {
            const authorization = request.header('Authorization');
            if (!authorization || !authorization.includes(' ')) {
                return response.status(401).send(new AuthenticationError());
            }
            const encodedToken = authorization.split(' ')[1];
            const token: ITokenUser & { exp: number } =
                await verifyTokenAsync(encodedToken, config.auth.TOKEN_SECRET, { ignoreExpiration: true });

            const currentUser = await UserModel.findOneByUsername(token.username);

            const notification: INotification  = request.body;
            const notificationModel = new NotificationModel(notification);

            notificationModel.emittedDate         = new Date();
            notificationModel.from                = currentUser.username;
            notificationModel.status              = NotificationStatus.EMITTED;

            if (notificationModel.dueDate) {
                // let appEvent         = new Appointment();
                const appEvent         = new AppointmentModel();
                appEvent.title       = notification.subject;
                appEvent.description = notification.body;
                appEvent.emittedDate = notificationModel.emittedDate;
                appEvent.start       = appEvent.emittedDate;
                appEvent.end         = notification.dueDate;
                appEvent.labels      = notification.labels;

                const appUsered  = Object.assign(appEvent, {user: currentUser._id});
                // let newEvent   = await AppointmentModel.saveAppointment(appUsered);
                // REVIEW const newEvent   = await appUsered.save(appUsered);
            }

            const notifUsered: IDBNotification  = Object.assign(notificationModel, {user: currentUser._id});
             const newNotif     = null; // REVIEW await notificationModel.save(notifUsered);
            response.json(newNotif);

            // Si todo es correcto se indexa
            // const solr: SolRServices = new SolRServices();
            // solr.indexNotification(notification);


        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return response.status(400).send(new AuthorizationError('Invalid Token'));
            }
            console.error(err);

            const error = new InternalServerError('Esto es una patata de error');
            return response.status(500).send(error);
        }
    }

    // set up our routes
    public routes() {
     this.router.post('/pageNotifications', this.pageNotifications);
     this.router.post('/addNotification', this.addNotification);
     this.router.use(jwtMiddleware({
         secret: config.auth.TOKEN_SECRET,
         credentialsRequired: false
     }));

    }

  }

  const notifRoutes = new NotificationRouter();
  const router = notifRoutes.router;

  export default router;


