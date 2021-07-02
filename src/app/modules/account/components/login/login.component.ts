import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from '../../../../store/actions/account.actions';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private store : Store, private toast : ToastrService) { }
  ngOnInit(): void {
  }

  login()
  {
    this.store.dispatch(new Login(this.loginForm.value));
  }  
}
