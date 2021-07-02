import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { OrderState } from 'src/app/store/states/order.state';
import { Logout } from '../../store/actions/account.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  isLoggedIn$ = this._store.select(ourState => ourState.account.loggedIn);
  cartQuantity = this._store.select(OrderState.orderedItemsQuantity);
  constructor(private _store : Store) {
  }

  ngOnInit(): void {
  } 
  
  logout() {
    this._store.dispatch(new Logout());
  }
}


