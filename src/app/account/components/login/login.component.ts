import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState } from '../../store/states/account.state'
import { Login, Logout } from '../../store/actions/account.actions';
import { TokenPair } from '../../models/user';

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

  ngOnInit(): void {
  }

  login()
  {
    this.store.dispatch(new Login(this.loginForm.value));
  }
  
  logout()
  {
    this.store.dispatch(new Logout());
  }
}
