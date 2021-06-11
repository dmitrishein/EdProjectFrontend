import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Logout } from '../../store/actions/account.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$ = this._store.select(ourState => ourState.account.loggedIn);
  user$ = this._store.selectSnapshot(our => our.account.user);
  constructor(private _store : Store) { }

  ngOnInit(): void {
  }

  logout() {
    this._store.dispatch(new Logout());
  }
}
