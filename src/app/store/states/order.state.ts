import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { EditionService } from 'src/app/shared/services/edition.service';
import { OrderItem } from 'src/app/shared/models/order';
import { AddOrderItem, RemoveOrderItem } from '../actions/order.action';

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

    @Action(AddOrderItem)
    setPageParameters(ctx: StateContext<OrderStateModel>, action : AddOrderItem){
       const contex = ctx.getState();
       let tempOrderItem : OrderItem = {
        EditionId : action.params.id,
        OrderId : 0,
        ItemsCount : 1
       }
       contex.orderItems.push(tempOrderItem)
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
}