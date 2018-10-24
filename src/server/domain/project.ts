// External imports
import {
    Document,
    Schema,
    Model,
    model
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';
import * as mongoosePaginate from 'mongoose-paginate';

// Shared Imports
import { IProject } from '../../models/project';
import {  BaseModel } from './base';

export interface IDBProject extends IProject, Document {
}

// Create a Mongoose schema
const projectSchema: Schema = new Schema({

    name: String,
    details: String,

    user1: String,
    user2: String,
    mediator: String

    // user1: { type: Schema.Types.ObjectId, ref: 'User' },
    // user2: { type: Schema.Types.ObjectId, ref: 'User' },
    // mediator: { type: Schema.Types.ObjectId, ref: 'User' }
});

projectSchema.plugin(mongooseHistory);
projectSchema.plugin(mongoosePaginate);

// Register the schema
export let ProjectModel: BaseModel<IDBProject> = model<IDBProject>('Project', projectSchema) as BaseModel<IDBProject>;

