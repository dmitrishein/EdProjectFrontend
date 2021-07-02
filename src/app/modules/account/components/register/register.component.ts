import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Registration } from 'src/app/store/actions/account.actions';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  registerForm: FormGroup = new FormGroup(
  {
    username: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]), 
    lastName: new FormControl('',[Validators.required]), 
    email: new FormControl('',[Validators.required, Validators.email]),  
    password: new FormControl('',[Validators.required]),  
    confirmPassword: new FormControl('',[Validators.required]),
  });

  constructor(private toast : ToastrService, private store : Store,private router : Router) { }

  ngOnInit(): void {
  }

  registration()
  {
    this.store.dispatch(new Registration(this.registerForm.value));
  }  
}
