// External Imports
// import * as solr from 'solr-client'
// import { Request, Response, Router } from 'express';


// Shared Imports
// import { Appointment } from '../../../models/appointments'
 import { Notification } from '../../models/notification';
 import { Message     } from '../../models/message';

// import { ITokenUser  } from '../../../models/user'
// import { iSearchable } from '../../../models/search';
// import { Exception,
//          InternalServerError
// } from '../../../models/exception'


// Project imports
// import { config              } from '../config';

export type SolRCallback = (data: string) => any;

export class SolRServices {
    constructor() {
    }

    public indexNotification(notification: Notification): boolean {
    /*  // Create the solrR client
        let client = solr.createClient(config.solr);

         // Switch on "auto commit", by default `client.autoCommit = false`
         client.autoCommit = true;

         let notifIndexed = {
            type:       'Notification',
            labels:     notification.labels,
            from:       notification.from,
            subject:    notification.subject,
            body:       notification.body,
         }

         client.add(notifIndexed,function(err,obj){
             if(err){
                 // TODO
                //let error = new InternalServerError(err);
                // return response.status(500).send(error);
             } else {
                client.commit(function(err,res){
                    if(err) console.log(err);
                    if(res) console.log(res);
                 });             }
          });

          return true;
          */
         return true;
        }


    public indexMessages(msgs: Message[]): boolean {
        return true;
        /*
        // Create the solrR client
        let client = solr.createClient(config.solr);

         // Switch on "auto commit", by default `client.autoCommit = false`
         client.autoCommit = true;

         let docs:any[] = [];
         for (let msg of msgs) {
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
                 // TODO
                //let error = new InternalServerError(err);
                // return response.status(500).send(error);
             } else {
                client.commit(function(err,res){
                    if(err) console.log(err);
                    if(res) console.log(res);
                 });             }
          });

          return true;
          */
    }


    public async search(query: string, callback: SolRCallback ): Promise<any> {
        /*
        let client = solr.createClient(config.solr);
        // Switch on "auto commit", by default `client.autoCommit = false`
        client.autoCommit = true;
        //let obj = JSON.parse(query);
        let finalQuery = client.createQuery()
                .q(query)
                //.q({title_t : 'laptop'})
                //.q({'*':'*'})
                .start(0)
                .rows(10);
        //return client.search(finalQuery);
        client.search(finalQuery,function(err,obj){
            if(err){
                let error = new InternalServerError(err);
            } else{
                return callback(obj.response.docs);
            }
        });
        */
    }
}

// module.exports = SolRServices;
