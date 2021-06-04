import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState } from '../../store/states/account.state'
import { GetUsersData, Login, Logout } from '../../store/actions/account.actions';
import { TokenPair } from '../../models/user';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Select(AccountState) account$!: Observable<TokenPair>; 

  loginForm: FormGroup = new FormGroup(
   {
      email: new FormControl('',[Validators.required]), 
      password: new FormControl('',[Validators.required]),
  });

  constructor(private store : Store) { 

  }
  logEroor: any;
  ngOnInit(): void {

  }

  login()
  {
    this.store.dispatch(new Login(this.loginForm.value)).subscribe(
      () => this.store.dispatch(new GetUsersData()));
  }
  
  logout()
  {
    this.store.dispatch(new Logout());
  }
}
