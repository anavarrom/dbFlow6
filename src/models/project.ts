// import {ITokenUser, TokenUser} from './user'

export interface IProject {
    name: string;
    details: string;

    user1: string;
    user2: string;
    mediator: string;
}


export class Project implements IProject {
    name: string;
    details: string;

    user1: string;
    user2: string;
    mediator: string;

    constructor(mediator: string) {
        this.mediator    = mediator;
    }
}
