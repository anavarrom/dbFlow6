export interface IAddress {
    name: string;
    address: string;
}

export interface IAddressGroup {
    value: IAddress[];
    text: string;
    html: string;
}

export interface IAttachment {
    filename: string;
    contentType: string;
    size: number;
    data: any;
}


export interface IMessage {
    externalId: string;
    labels: string[];
    subject: string;
    // from: iAddressGroup;
    from: string;
    date: Date;
    text: string;
    html: string;
    textAsHtml: string;
    // attachments: iAttachment[];
}

export class Address implements IAddress {
    name: string;
    address: string;

    constructor(name: string, address: string) {
        this.name       = name;
        this.address    = address;
    }
}

export class AddressGroup implements IAddressGroup {
    value: Address[];
    text: string;
    html: string;

    constructor(text: string, html: string, adresses: Address[]) {
        this.text       = text;
        this.html       = html;
        this.value      = adresses;
    }
}

export class Attachment implements IAttachment {
    filename: string;
    contentType: string;
    size: number;
    data: any;

    constructor(filename: string) {
        this.filename       = filename;
    }
}

export class Message implements IMessage {
    externalId: string;
    labels: string[];
    subject: string;
    from: string;
    // from: AddressGroup;
    date: Date;
    text: string;
    html: string;
    textAsHtml: string;
    // attachments: Attachment[];

    constructor() {
    }
}

