// External imports
import {
    Document,
    Schema,
    Model,
    model
} from 'mongoose';

import * as mongooseHistory from 'mongoose-history';

// Shared Imports
import {  IAppointment } from '../../models/appointments';

export interface IDBAppointment extends IAppointment, Document {
}

// Create a Mongoose schema
const appointmentSchema: Schema = new Schema({

    title: String,
    description: String,
    emittedDate: Date,
    start: Date,
    end: Date,
    labels: [String],
    allDay: Boolean,
    editable: Boolean,
    backgroundColor: String,
    textColor: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    // from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // attachments: iAttachment[];
});
appointmentSchema.plugin(mongooseHistory);

// Register the schema
export let AppointmentModel: Model<IDBAppointment> = model<IDBAppointment>('Appointment', appointmentSchema);

