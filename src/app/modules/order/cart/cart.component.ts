import { Component,ViewChild, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { OrderItem } from 'src/app/shared/models/order';
import { CreateOrder, DecreaseOrderItemCount, IncreaseOrderItemCount, RemoveOrder, RemoveOrderItem } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  token: any;
  priceToCheckOut !: number;
  orderItems !: OrderItem[];
  isLoggedIn$ = this.store.select(ourState => ourState.account.loggedIn);
  displayedColumns: string[] = ['Id', 'Title', 'Price', 'Count','Total'];
  @ViewChild(MatTable) table?: MatTable<OrderItem>;
  
  constructor(private store : Store, private toast : ToastrService,private router : Router) { 
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
    this.table?.renderRows();
  }

  removeItem(editId : number){
    this.store.dispatch(new RemoveOrderItem(editId));
    this.table?.renderRows();
  }
  increaseItemCount(orderItem :OrderItem){
    this.store.dispatch(new IncreaseOrderItemCount(orderItem));
  }
  decreaseItemCount(orderItem :OrderItem){
    this.store.dispatch(new DecreaseOrderItemCount(orderItem));
    this.table?.renderRows();
  }

  onCheckout(sum:number){
  var handler = (<any>window).StripeCheckout.configure({
    key : "pk_test_51IiJzdFHRC0nt9sgERFHWpA1jRn6fz4bRSheVUcCTXdbAFjLQqZFu2mYPmzeCPuVqN5I3fHUNwkTBZO0rZXWCZFD00redMUVSC",
    locale : 'auto',
    source: async (source: any) => {
      this.store.dispatch(new CreateOrder({SourceId:source.id,OrderItems:this.orderItems})).subscribe(
        () => {     
          this.router.navigate(["/editions"]);
        },
        (err)=>{
          debugger;
          this.router.navigate(["/editions"]);
        })
      }
  })

  handler.open({
    email : this.store.selectSnapshot(state => state.account.user.email),
    name: 'Book Store',
    description: 'Your checkout',
    amount: sum * 100
  });

  }


  ngOnInit(): void {
  }

}
