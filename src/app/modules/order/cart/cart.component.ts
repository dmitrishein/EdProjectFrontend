import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { OrderItem } from 'src/app/shared/models/order';
import { RemoveOrderItem } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderItems !: OrderItem[];

  constructor(private store : Store) { 
    this.store.select(OrderState.orderedItems).subscribe(
      (res) => {
        this.orderItems = res;
      }
    )
  }

  removeItem(editId : number){
    this.store.dispatch(new RemoveOrderItem(editId));
  }
  ngOnInit(): void {
  }

}
