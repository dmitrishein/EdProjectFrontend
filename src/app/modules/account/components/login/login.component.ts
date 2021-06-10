import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUsersData, Login, Logout } from '../../../../store/actions/account.actions';
import { Router } from '@angular/router';

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

  constructor(private store : Store, private router:Router) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.selectSnapshot(ourState => ourState.account.loggedIn);
    if(this.isLoggedIn$){
      this.router.navigate(['/']);
    }
  }

  login()
  {
    this.store.dispatch(new Login(this.loginForm.value))
    .subscribe(
      () => {
        this.store.dispatch(new GetUsersData()).subscribe(
          () => {window.location.reload()}
        )
      },
      (error) => {
        this.errorMessage = error.error;
      }
        
     );
  }  
}
