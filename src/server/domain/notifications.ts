// External imports
// import * as mongoose from 'mongoose';
import {
    Document,
    Schema,
    Model,
    model
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';
import * as mongoosePaginate from 'mongoose-paginate';

// Shared Imports
import {  INotification } from '../../models/notification';
import {  BaseModel } from './base';

export interface IDBNotification extends INotification, Document {
}

// Create a Mongoose schema
const notificationSchema: Schema = new Schema({
    subject: String,
    body: String,
    from: String,
    to: String,
    emittedDate: Date,
    readDate: Date,
    dueDate: Date,
    labels: [String],
    status: {
        type: String,
        enum: ['Emitted', 'Received', 'Read'],
    },

    user: { type: Schema.Types.ObjectId, ref: 'User' },

    // from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // attachments: iAttachment[];
});
/*
var options = {
    metadata: [
      {key: 'username', value: 'from'},
      {key: 'username2', value: function(original, newObject){return original.user}},
      //{key: 'titleAsync', value: function(original, newObject, cb){cb(null, newObject.title)}}
    ]
  };
  */
notificationSchema.plugin(mongooseHistory);
notificationSchema.plugin(mongoosePaginate);

// Register the schema
export let NotificationModel: BaseModel<IDBNotification> =
    model<IDBNotification>('Notification', notificationSchema) as BaseModel<IDBNotification>;

