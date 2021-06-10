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

  isLoggedIn$!: Observable<boolean>;
  username:string = "";
  constructor(private _store : Store) { }
  
  ngOnInit(): void {
   this.isLoggedIn$ = this._store.selectSnapshot(ourState => ourState.account.loggedIn);
   let user$ = this._store.selectSnapshot(our => our.account.user);
   user$ = JSON.parse(JSON.stringify(user$));
   this.username = user$[0].username;
  }

  logout()
  {
    this._store.dispatch(new Logout());
  }
}
