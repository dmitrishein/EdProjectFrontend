export interface OrderItem {
    EditionId:number,
    Title : string,
    Price : number,
    ItemsCount:number,
    OrderAmount : number,
    OrderId:number,
}

export interface CreateOrderModel {
    SourceId : string,
    OrderItems : OrderItem[]
}