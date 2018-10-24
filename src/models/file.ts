export interface IFile {
    filename: string;
    contentType: string;
    size: number;
    data: any;
}

export class DBFile implements IFile {
    filename: string;
    contentType: string;
    size: number;
    data: any;

    constructor(filename: string) {
        this.filename       = filename;
    }
}
