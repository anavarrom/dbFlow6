export interface IPaginateOptions {
    select?: Object | string;
    sort?: Object | string;
    populate?: Array<Object> | Array<string> | Object | string;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;
  }
  
  export interface IPaginateResult<T> {
    docs: Array<T>;
    total: number;
    limit: number;
    page?: number;
    pages?: number;
    offset?: number;
  }
  
  export class PaginateOptions implements IPaginateOptions {

    select?: Object | string;
    sort?: Object | string;
    populate?: Array<Object> | Array<string> | Object | string;
    lean?: boolean;
    leanWithId?: boolean;
    offset?: number;
    page?: number;
    limit?: number;

    constructor() {
        //this.select = 'email username';
        //this.sort = { };
        //this.populate = '';
        this.lean = false;
        this.leanWithId = true;
        this.offset = 0;
        this.page = 1;
        this.limit = 10;
    }   
  }