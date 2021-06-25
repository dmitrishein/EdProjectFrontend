import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { EditionService } from 'src/app/shared/services/edition.service';
import { OrderItem } from 'src/app/shared/models/order';
import { AddOrderItem, DecreaseOrderItemCount, IncreaseOrderItemCount, RemoveOrderItem} from '../actions/order.action';

export interface OrderStateModel {
    orderItems : OrderItem[];
}
  
@State<OrderStateModel>({
      name: 'order',
      defaults: {
        orderItems : [],
    }
})

@Injectable()
export class OrderState {

    constructor(private editionService: EditionService) {
    }

    @Selector() static orderedItems (state:OrderStateModel){ 
        return state.orderItems;
    }
    @Selector() static checkoutPrice (state:OrderStateModel){ 
        const sum = state.orderItems.reduce((sum,current) => sum + current.OrderAmount, 0)
        return sum;
    }
    

    @Action(AddOrderItem)
    addOrderItem(ctx: StateContext<OrderStateModel>, action : AddOrderItem){
       const contex = ctx.getState();
       contex.orderItems.push({
        EditionId : action.params.id,
        Title: action.params.title,
        Price : action.params.price,
        OrderAmount: action.params.price,
        OrderId : 0,
        ItemsCount : 1
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
       console.log(contex.orderItems);
       ctx.setState({orderItems: contex.orderItems});
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


}