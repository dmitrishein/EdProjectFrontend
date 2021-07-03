import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsersData, Login } from '../../../../store/actions/account.actions';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AccountState } from 'src/app/store/states/account.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  errorMessage : string = "";
  
  loginForm: FormGroup = new FormGroup(
  {
      email: new FormControl('',[Validators.required,Validators.email]), 
      password: new FormControl('',[Validators.required]),
  });

  constructor(private store : Store, private router : Router) { }
  ngOnInit(): void {
  }

  login()
  {
    debugger;
    this.store.dispatch(new Login(this.loginForm.value)).subscribe(
      ()=>{
      }
    );
  }  
}
