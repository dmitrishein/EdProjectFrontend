import { Component, OnInit}  from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { OrderModel, OrdersPageParamsModel } from 'src/app/shared/models/order';
import { GetOrders, RemoveOrder, UpdateOrder } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface SortType {
  id : number,
  name : string,
  isReversed : boolean
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})


export class OrdersPageComponent implements OnInit {
  resultsLength !: number;
  sortTypeList : SortType[] = [
    {id : 1, name : "Date : From Newest to Older", isReversed : false},
    {id : 1 , name : "Date : From Older to Newest", isReversed: true},
    {id : 2 , name : "Price : From Low to High", isReversed: false},
    {id : 2 , name : "Price : From High to Low", isReversed: true}
  ]
  selectedSortType !: SortType;
  displayedColumns: string[] = ['OrderId', 'OrderTime', 'Product', 'Title','Quantity','OrderAmount','OrderStatus'];

  orders!:OrderModel[];

  params !: OrdersPageParamsModel;

  constructor(private store : Store, private toast : ToastrService,private router: Router) { 
    this.params ={
      ElementsPerPage : 5,
      CurrentPageNumber: 1,
      SearchString : "",
      SortType:0,
      IsReversed:false
    }
    this.store.dispatch(new GetOrders(this.params));

    this.store.select(OrderState.orders).subscribe(
      (res)=>{
        debugger;
        this.orders = res!;
      }
    )
    this.store.select(OrderState.totalItemsAmount).subscribe(
      (res)=>{
        this.resultsLength = res!;
        console.log(res);
      }
    )
  }

  ngOnInit(): void {

  }

  updateOrderStatus(orderId : number,sum:number){
    debugger;
    var handler = (<any>window).StripeCheckout.configure({
      key : "pk_test_51IiJzdFHRC0nt9sgERFHWpA1jRn6fz4bRSheVUcCTXdbAFjLQqZFu2mYPmzeCPuVqN5I3fHUNwkTBZO0rZXWCZFD00redMUVSC",
      locale : 'auto',
      source: async (source: any) => {
        debugger;
        this.store.dispatch(new UpdateOrder({SourceId:source.id,OrderId:orderId})).subscribe(
          () => {
            this.store.dispatch(new GetOrders(this.params));
          }
        );
      }
    })
  
    handler.open({
      email : this.store.selectSnapshot(state => state.account.user.email),
      name: 'Book Store',
      description: 'Your checkout',
      amount: sum * 100
    });
  
  }
  pageChanged(event:PageEvent){
    this.params.CurrentPageNumber = event.pageIndex + 1;
    this.params.ElementsPerPage = event.pageSize;
    this.store.dispatch(new GetOrders(this.params));
  }
  handlePageSorting(event:SortType){
    this.params.SortType = event.id;
    this.params.IsReversed = event.isReversed;
    this.store.dispatch(new GetOrders(this.params));
  }
}
