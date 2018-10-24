
export interface ILabel {
    labelId: string;
    value: string;
}


export class Label implements ILabel {
    labelId: string;
    value: string;

    constructor(labelId: string, value: string) {
        this.labelId     = labelId;
        this.value       = value;
    }
}

