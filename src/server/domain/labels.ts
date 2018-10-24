// External imports
import {
    Document,
    Schema,
    Model,
    model
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';

// Shared Imports
import {  ILabel } from '../../models/label';

export interface IDBLabel extends ILabel, Document {
}

// Create a Mongoose schema
const labelSchema: Schema = new Schema({
    labelId: String,
    value: String,

    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
labelSchema.plugin(mongooseHistory);

// Register the schema
export let LabelModel: Model<IDBLabel> = model<IDBLabel>('Label', labelSchema);

