// import { ITokenUser } from './user'
import {ISearchable} from './search';


export enum NotificationStatus {
    EMITTED          = 'Emitted',
    RECEIVED         = 'Received',
    READ             = 'Read'
}


export interface INotification {
    subject: string;
    body: string;
    from: string;
    to: string;
    emittedDate: Date;
    readDate: Date;
    dueDate: Date;
    labels: string[];
    status: NotificationStatus;
    // attachments: iAttachment[];
}

export class Notification implements INotification, ISearchable {
    subject: string;
    body: string;
    from: string;
    to: string;
    emittedDate: Date;
    readDate: Date;
    dueDate: Date;
    labels: string[];
    status: NotificationStatus;

    // attachments: Attachment[];

    constructor() {
    }

}
