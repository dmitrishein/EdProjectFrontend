import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Registration } from 'src/app/store/actions/account.actions';
import { VariablesConstants } from 'src/app/shared/constants/variables-constant';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  ERROR_MESSAGES = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'pattern', message: 'Enter valid username'}
    ],
    'firstName': [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'Min length 2' },
      { type: 'pattern', message: 'Enter valid first name'}
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required' },
      { type: 'pattern', message: 'Enter valid last name'}
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
      { type: 'passwordMatch', message: 'Passwords mismatch' },
    ],
  };

  registerForm: FormGroup = new FormGroup(
  {
    username: new FormControl('',Validators.compose([Validators.required,Validators.pattern(VariablesConstants.USERNAME_PATTERN)])),
    firstName: new FormControl('',Validators.compose([Validators.required,Validators.pattern(VariablesConstants.NAME_PATTERN)])), 
    lastName: new FormControl('',Validators.compose([Validators.required,Validators.pattern(VariablesConstants.NAME_PATTERN)])), 
    email: new FormControl('',[Validators.required, Validators.email]),  
    password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(7), Validators.pattern(VariablesConstants.PASSWORD_PATTERN)])),  
    confirmPassword: new FormControl('',Validators.compose([Validators.required,Validators.minLength(7), Validators.pattern(VariablesConstants.PASSWORD_PATTERN),this.passwordMatchValidator])),
  });

  passwordMatchValidator(form : FormGroup) {
    return (control : FormGroup) => {
      const pass = control.get("password");
      const confPass = control.get("confirmPassword");
      if(pass === confPass){
        console.log("kek");
        return {passwordMatchValidator: true};
      }
      return null;
    }
  }
  constructor(private toast : ToastrService, private store : Store) { }

  ngOnInit(): void {
  }

  registration()
  {
    this.store.dispatch(new Registration(this.registerForm.value));
  }

}
