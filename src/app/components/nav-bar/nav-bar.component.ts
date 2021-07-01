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
  cartLength !: number;

  constructor(private _store : Store) {
  }

  ngOnInit(): void {
    this._store.select(OrderState.orderedItems).subscribe(
      items => this.cartLength = items.length
    )
  } 
  
  logout() {
    this._store.dispatch(new Logout());
  }
}


