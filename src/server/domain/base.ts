// External imports
import {
    Document,
    Schema,
    Model,
    model,
    PaginateModel
} from 'mongoose';

import * as mongoosePaginate from 'mongoose-paginate';

export interface BaseModel<T extends Document> extends PaginateModel<T> {}
