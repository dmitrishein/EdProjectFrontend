import { Edition } from "src/app/shared/models/edition";
import { OrderItem } from "src/app/shared/models/order";

export class AddOrderItem {
    static readonly type = '[Order] Add Order Item';
    constructor (public params : Edition){};
}
export class RemoveOrderItem {
    static readonly type = '[Order] Remove Order Item';
    constructor (public id : number){};
}