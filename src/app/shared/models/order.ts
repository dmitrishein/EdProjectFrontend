export interface OrderItem {
    EditionId:number,
    Title : string,
    Price : number,
    ItemsCount:number,
    OrderAmount : number,
    OrderId:number,
    BookType: string
}

export interface CreateOrderModel {
    SourceId : string,
    OrderItems : OrderItem[]
}

export interface OrdersPageParamsModel{
    ElementsPerPage : number;
    CurrentPageNumber : number;
    SearchString : string;
    SortType : number;
    IsReversed : boolean;
}
export interface OrdersPageResponseModel{
    TotalItemsAmount : number;
    CurrentPage : number;
    OrdersPage : OrderModel[];
}
export interface OrderModel{
    Id : number,
    Total : number,
    CreatedAt : Date,
    StatusType : string,
    OrderItems : OrderItem[]
}