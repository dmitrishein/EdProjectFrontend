import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/account/shared/user';
import { Logout } from '../../modules/account/store/account.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  public username$!:User;
  constructor(private _store : Store) { }
  
  ngOnInit(): void {
   this.isLoggedIn$ = this._store.selectSnapshot(ourState => ourState.account.loggedIn);
   this.username$.username = this._store.selectSnapshot(our => our.account.user);
   console.log(this.isLoggedIn$);
   console.log(this.username$.username);
  }

  logout()
  {
    this._store.dispatch(new Logout());
  }
}
