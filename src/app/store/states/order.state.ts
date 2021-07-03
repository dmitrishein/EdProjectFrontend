import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { EditionService } from 'src/app/shared/services/edition.service';
import { OrderItem, OrderModel, OrdersPageResponseModel } from 'src/app/shared/models/order';
import { AddOrderItem, CreateOrder, DecreaseOrderItemCount, GetOrders, IncreaseOrderItemCount, RemoveOrder, RemoveOrderItem, UpdateOrder} from '../actions/order.action';
import { OrderService } from 'src/app/shared/services/order.service';
import { Edition } from 'src/app/shared/models/edition';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface OrderStateModel {
    orderId : number,
    orderItems : OrderItem[];
    orders : OrdersPageResponseModel | null;
}
  
@State<OrderStateModel>({
      name: 'order',
      defaults: {
        orderId : 0,
        orderItems : [],
        orders : null
    }
})

@Injectable()
export class OrderState {

    constructor(private orderService:OrderService, private toast : ToastrService, private router : Router) {
    }

    @Selector() static orders (state:OrderStateModel){
        return state.orders?.OrdersPage;
    }
    @Selector() static orderId (state:OrderStateModel){ 
        return state.orderId;
    }
    @Selector() static orderedItems (state:OrderStateModel){ 
        return state.orderItems;
    }
    @Selector() static orderedItemsQuantity (state:OrderStateModel){ 
        return state.orderItems.length;
    }
    @Selector() static checkoutPrice (state:OrderStateModel){ 
        const sum = state.orderItems.reduce((sum,current) => sum + current.OrderAmount, 0)
        return sum;
    }
    @Selector() static isInCart(state: OrderStateModel){
        return (edition:Edition) => { 
            return state.orderItems.find(x => x.EditionId === edition.id) ? true : false;
        }
    }
    @Selector() static totalItemsAmount (state:OrderStateModel){ 
        return state.orders?.TotalItemsAmount;
    }


    @Action(AddOrderItem)
    addOrderItem(ctx: StateContext<OrderStateModel>, action : AddOrderItem){
       const contex = ctx.getState();
       if(contex.orderItems.find(x=>x.EditionId === action.params.id)){
           debugger;
           return;
       }
       contex.orderItems.push({
        EditionId : action.params.id,
        Title: action.params.title,
        Price : action.params.price,
        OrderAmount: action.params.price,
        OrderId : 0,
        ItemsCount : 1,
        BookType :action.params.type
       })
       ctx.patchState(contex);
    }
    @Action(RemoveOrderItem)
    removeOrderItem(ctx: StateContext<OrderStateModel>, action : RemoveOrderItem){
       const contex = ctx.getState();
       contex.orderItems.forEach((value,index)=> { 
           if(value.EditionId === action.id){
               contex.orderItems.splice(index,1);
           }
       });
       ctx.setState({orderId:contex.orderId,orderItems: contex.orderItems, orders: contex.orders});
    }
    @Action(IncreaseOrderItemCount)
    updateCount(ctx: StateContext<OrderStateModel>, action : IncreaseOrderItemCount){
       const contex = ctx.getState();
       contex.orderItems.map( item => {
                            item.ItemsCount = item.EditionId === action.params.EditionId ? item.ItemsCount + 1 : item.ItemsCount
                            item.OrderAmount = item.EditionId === action.params.EditionId ? item.Price * item.ItemsCount : item.OrderAmount});
       ctx.patchState(contex);
    }
    @Action(DecreaseOrderItemCount)
    decreaseCount(ctx: StateContext<OrderStateModel>, action : DecreaseOrderItemCount){
       const contex = ctx.getState();
       contex.orderItems.map( item => {
                            item.ItemsCount = item.EditionId === action.params.EditionId && item.ItemsCount>1? item.ItemsCount - 1 : item.ItemsCount
                            item.OrderAmount = item.EditionId === action.params.EditionId ? item.Price * item.ItemsCount : item.OrderAmount});
       ctx.patchState(contex);
    }


    @Action(CreateOrder)
    createOrder(ctx: StateContext<OrderStateModel>, action : CreateOrder){
        ctx.dispatch(new RemoveOrder());
        return this.orderService.createPayment(action.params).pipe(
            tap((result) => { 
            this.toast.success(`${result} was created`),
            ctx.patchState({ orderId : result });
            })
        );  
    }
    @Action(UpdateOrder)
    updateOrder(ctx: StateContext<OrderStateModel>, action : UpdateOrder){
        return this.orderService.updateOrderStatus(action.params).pipe(
            tap(() =>{
                this.toast.success(`${action.params.OrderId} was successfully paid`);    
            }
        ));  
    }

    @Action(RemoveOrder)
    removeOrder(ctx: StateContext<OrderStateModel>, action : RemoveOrder){
        //To Do : Rename to "Clean Cart"
        var contex = ctx.getState();
        ctx.setState({orderId:0,orderItems: [],orders:contex.orders});
    }

    @Action(GetOrders)
    getUserOrders (ctx: StateContext<OrderStateModel>, action : GetOrders){
        return this.orderService.getUserOrders(action.params).pipe(
            tap((ordersPage : OrdersPageResponseModel)=>{
                let response = Object.values(ordersPage);         
                ctx.patchState({orders: {
                    TotalItemsAmount : response[0],
                    CurrentPage : response[1],
                    OrdersPage : response[2]
                }});
            })
        )
    }

}