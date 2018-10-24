export interface ITokenUser {
    username: string;
    lastUpdated: Date;

//    displayName?: string;
//    picture?: string;
}

export class TokenUser implements ITokenUser {

    username: string;
    lastUpdated: Date;

    constructor(username: string) {
        this.username = username;
    }
}


