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
import { IFile } from '../../models/file';
import {  BaseModel } from './base';

export interface IDBFile extends IFile, Document {
}

// Create a Mongoose schema
const fileSchema: Schema = new Schema({

    filename: String,
    contentType: String,
    size: Number,
    data: Buffer,

    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

fileSchema.plugin(mongooseHistory);
fileSchema.plugin(mongoosePaginate);

// Register the schema
export let FileModel: BaseModel<IDBFile> = model<IDBFile>('File', fileSchema) as BaseModel<IDBFile>;

