// External imports
import {
    Document,
    Schema,
    Model,
    model,
    PaginateModel
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';
import * as mongoosePaginate from 'mongoose-paginate';

// Shared Imports
import {  IMessage } from '../../models/message';
import {  BaseModel } from './base';

export interface IDBMessage extends IMessage, Document  {
}

// Create a Mongoose schema
const messageSchema: Schema = new Schema({
    externalId: String,
    labels: [String],
    subject: String,
    // from: iAddressGroup;
    from: String,
    date: Date,
    text: String,
    html: String,
    textAsHtml: String,

    user: { type: Schema.Types.ObjectId, ref: 'User' },

   // attachments: iAttachment[];
});

/*var options = {
    metadata: [
      {key: 'username', value: 'user.username'},
      //{key: 'titleFunc', value: function(original, newObject){return newObject.title}},
      //{key: 'titleAsync', value: function(original, newObject, cb){cb(null, newObject.title)}}
    ]
  };
  */
// messageSchema.plugin(mongooseHistory,options);
messageSchema.plugin(mongooseHistory);
messageSchema.plugin(mongoosePaginate);

// Register the schema
// export let MessageModel:Model<IDBMessage> = model<IDBMessage>('Message', messageSchema);
export let MessageModel: BaseModel<IDBMessage> = model<IDBMessage>('Message', messageSchema) as BaseModel<IDBMessage>;

