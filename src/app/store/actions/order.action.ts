import { Edition } from "src/app/shared/models/edition";
import { CreateOrderModel, OrderItem } from "src/app/shared/models/order";

export class AddOrderItem {
    static readonly type = '[Order] Add Order Item';
    constructor (public params : Edition){};
}
export class RemoveOrderItem {
    static readonly type = '[Order] Remove Order Item';
    constructor (public id : number){ };
}
export class IncreaseOrderItemCount{
    static readonly type = '[Order] Increase Order Item Amount';
    constructor (public params : OrderItem){};
}

export class DecreaseOrderItemCount{
    static readonly type = '[Order] Decrease Order Item Amount';
    constructor (public params : OrderItem){};
}

export class CreateOrder{
    static readonly type = '[Order] Create Order';
    constructor (public params : CreateOrderModel){};
}

export class RemoveOrder{
    static readonly type = '[Order] Remove Order';
}