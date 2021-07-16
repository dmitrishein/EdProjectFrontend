import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from '../../../../store/actions/account.actions';
import { Router } from '@angular/router';
import { VariablesConstants } from 'src/app/shared/constants/variables-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  errorMessage : string = "";

  ERROR_MESSAGES = {
    'firstName': [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'Min length 2' }
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required' }
    ],

    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 7' },
      { type: 'pattern', message: 'One ore more lowercase characters' },
      { type: 'pattern', message: 'One ore more uppercase characters' },
      { type: 'pattern', message: 'Any symbols " @#$%_!%&* "' },
      { type: 'pattern', message: 'One more digit from 0-9' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 7' },
    ],
  };
  loginForm: FormGroup = new FormGroup(
  {
      email: new FormControl('',[Validators.required,Validators.email]), 
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(7), Validators.pattern(VariablesConstants.PASSWORD_PATTERN)])),
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
