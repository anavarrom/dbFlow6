export interface IException {
    message: string;
    detail: string;
    stack: string;
    url: string;
    code: string;
}

export class Exception implements IException {
    message: string;
    detail: string;
    stack: string;
    url: string;
    code: string;

    constructor(message: string, detail: string) {
        this.message      = message;
        this.detail       = detail;
    }
}

export class InternalServerError extends Exception {
    constructor(detail: string) {
        super('Internal Server Error', detail);
        this.code = '500';
    }
}

export class AuthenticationError extends Exception {
    constructor() {
        super('The user is not authenticated', 'No token found');
        this.code = '401';
    }
}

export class AuthorizationError extends Exception {
    constructor(detail: string) {
        super('The user has not privileges to access this service', detail);
        this.code = '400';
    }
}
