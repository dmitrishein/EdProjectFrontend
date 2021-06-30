import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { MatTableModule} from '@angular/material/table';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CartComponent,
    OrdersPageComponent
  ],
  imports: [
    MatPaginatorModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    FormsModule,
  ]
})
export class OrderModule { }
