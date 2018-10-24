// External imports
import {
    Document,
    Schema,
    Model,
    model
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';

// Shared Imports
import {  ITokenUser } from '../../models/user';

// Project Imports

export interface IDBUser extends ITokenUser, Document {
        password?: string;
        google_access_token?: string;
}

export interface IUserModel extends Model<IDBUser> {
    findOneByUsername: (name: String)  => IDBUser;
    findOneByGoogleId: (name: String)  => IDBUser;
}

// Create a Mongoose schema
const userSchema: Schema = new Schema({
    username: String,
    lastUpdated: Date,
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],

    google_access_token: String,
    google_sub: String,
    password: String,
});
userSchema.plugin(mongooseHistory);

userSchema.statics.findOneByUsername = function(name) {
    return this.findOne({ username: name });
};

userSchema.statics.findOneByGoogleId = function(name) {
    return this.findOne({ google_sub: name });
};

// Register the schema
export let UserModel: IUserModel = model<IDBUser, IUserModel>('User', userSchema);

