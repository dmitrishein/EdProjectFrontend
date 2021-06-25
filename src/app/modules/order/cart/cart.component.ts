import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { OrderItem } from 'src/app/shared/models/order';
import { DecreaseOrderItemCount, IncreaseOrderItemCount, RemoveOrderItem } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  priceToCheckOut !: number;
  orderItems !: OrderItem[];

  constructor(private store : Store) { 
    this.store.select(OrderState.orderedItems).subscribe(
      (res) => {
        this.orderItems = res;
      }
    )
    this.store.select(OrderState.checkoutPrice).subscribe(
      (res) => {
        this.priceToCheckOut = res;
      }
    );
  }

  removeItem(editId : number){
    this.store.dispatch(new RemoveOrderItem(editId));
  }

  increaseItemCount(orderItem :OrderItem){
    this.store.dispatch(new IncreaseOrderItemCount(orderItem));
  }

  decreaseItemCount(orderItem :OrderItem){
    this.store.dispatch(new DecreaseOrderItemCount(orderItem));
  }
  ngOnInit(): void {
  }

}
