import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  errorMessage : string = "";
  registerForm: FormGroup = new FormGroup(
  {
    username: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]), 
    lastName: new FormControl('',[Validators.required]), 
    email: new FormControl('',[Validators.required, Validators.email]),  
    password: new FormControl('',[Validators.required]),  
    confirmPassword: new FormControl('',[Validators.required]),
  });

  constructor(private accService : AccountService, private router : Router, private store : Store) { }

  ngOnInit(): void {
  }

  registration()
  {
    this.accService.register(this.registerForm.value).subscribe( 
      () =>{ 
        this.registerForm.reset();
        this.registerForm.clearValidators();
        this.errorMessage = "Registration successful!";
      },
      (error) => {
          this.errorMessage = error.error;
      }
    );
  }  
}
