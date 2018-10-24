// External Imports
// import * as express from 'express';
import * as jwtMiddleware from 'express-jwt';
// import * as solr from 'solr-client'

import { Request, Response, Router } from 'express';
// import { JsonWebTokenError } from 'jsonwebtoken';
// import {
//     PaginateOptions,
//     PaginateResult,
// } from 'mongoose';

// Shared Imports
// import { Appointment } from '../../../models/appointments'
// import { Message     } from '../../models/message';
// import { ITokenUser  } from '../../models/user';
// import { Exception,
//          InternalServerError,
//          AuthenticationError,
//          AuthorizationError
// } from '../../models/exception';

// Project Services
// import {SolRServices} from '../services/solrServices'
// Project imports
// import { UserModel,IDBUser   } from '../domain/users'
// import { AppointmentModel    } from '../domain/appointments'
// import { MessageModel,       } from '../domain/messages'
// import { verifyTokenAsync    } from '../helpers';
import { config              } from '../config';
// import { not } from 'joi';

export class SolrRouter {

    public router: Router;

    constructor() {
      this.router = Router();
      this.routes();
    }

    public async search(request: Request, response: Response): Promise<Response> {
/*
        try {
            const authorization = request.header("Authorization");
            if (!authorization || !authorization.includes(' ')) {
                return response.status(401).send('No Token');
            }
            const encodedToken = authorization.split(' ')[1];
            const token: ITokenUser & { exp: number } =
                await verifyTokenAsync(encodedToken, config.auth.TOKEN_SECRET, { ignoreExpiration: true });

            // let notification: iNotification  = request.body;
            let user         = await UserModel.findOneByUsername(token.username);
            let searchText: string = request.body.text;
            let solr: SolRServices = new SolRServices();

            let result = await solr.search(searchText, function(returnValue)
            {
                return response.json(returnValue);
            });
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return response.status(400).send('Invalid Token');
            } else if  (err instanceof InternalServerError) {
                return response.status(500).send(err);
            }
            return response.sendStatus(500);
        }
 */
    return null;
    }

    public async indexEmails(request: Request, response: Response): Promise<Response> {
        return null;
/*
        try {
            const authorization = request.header("Authorization");
            if (!authorization || !authorization.includes(' ')) {
                return response.status(401).send('No Token');
            }
            const encodedToken = authorization.split(' ')[1];
            const token: ITokenUser & { exp: number } =
                await verifyTokenAsync(encodedToken, config.auth.TOKEN_SECRET, { ignoreExpiration: true });

            // let notification: iNotification  = request.body;
            let user         = await UserModel.findOneByUsername(token.username);

            let options: PaginateOptions = {};
            options.limit = 100;
            options.page = 1;
            options.lean = false;
            options.leanWithId = true;
            options.offset = 0;


            MessageModel.paginate({}, options, (err: any, value: PaginateResult<Message>) => {
                if (err) {
                    let error = new InternalServerError(err);
                    return response.status(500).send(error);
                }

                let msg:Message = null;
                let docs = [];

                let client = solr.createClient({
                   host:'127.0.0.1',
                   port:'8983',
                   core:'dbFlow5',
                   path:'/solr',
                   solrVersion:'5.1'}
                );
                // Switch on "auto commit", by default `client.autoCommit = false`
                client.autoCommit = true;

                for (let msg of value.docs) {
                    let cleanMsg = {
                        type: 'Message',
                        from:msg.from,
                        subject:msg.subject,
                        text:msg.text,
                        labels: msg.labels
                        };
                    docs.push(cleanMsg);
                }


                 client.add(docs,function(err,obj){
                     if(err){
                        console.log(err);
                     }else{
                        console.log(obj);
                     }
                  });

                  client.commit(function(err,res){
                    if(err) console.log(err);
                    if(res) console.log(res);
                 });
                  return response.json(value);
            });
          //  return response.sendStatus(500);
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return response.status(400).send('Invalid Token');
            }
            console.error(err);
            return response.sendStatus(500);
        }
        */
    }

    // set up our routes
    public routes() {
     this.router.get('/indexEmails', this.indexEmails);
     this.router.post('/search', this.search);
     this.router.use(jwtMiddleware({
         secret: config.auth.TOKEN_SECRET,
         credentialsRequired: false
     }));
    }
  }

  const solrRouter = new SolrRouter();
  const router = solrRouter.router;

  export default router;


