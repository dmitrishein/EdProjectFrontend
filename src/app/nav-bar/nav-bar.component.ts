import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;

  constructor(private _store : Store) { }
  
  ngOnInit(): void {
   this.isLoggedIn$ = this._store.selectSnapshot(ourState => ourState.account.loggedIn);
   console.log(this.isLoggedIn$);
  }

}
