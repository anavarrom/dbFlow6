// import { ITokenUser } from './user'


export interface IAppointment {
    labels: string[];
    title: string;
    description: string;
    emittedDate: Date;
    start: Date;
    end: Date;
    allDay: Boolean;
    editable: Boolean;
    backgroundColor: String;
    textColor: String;

}

export class Appointment implements IAppointment {
    labels: string[];
    title: string;
    description: string;
    emittedDate: Date;
    start: Date;
    end: Date;
    allDay: Boolean = false;
    editable: Boolean = false;
    backgroundColor: String;
    textColor: String;
    constructor() {
    }
}
