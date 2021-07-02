import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChangePassword, ResetPassword } from 'src/app/store/actions/account.actions';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  isTokenSended !: boolean;
  errorMessage : string = "";
  constructor(private route : ActivatedRoute,private store : Store, private router : Router) {
    this.isTokenSended = false;
  }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['token']){
     this.isTokenSended = true;
    }
  }

  resetPassword(email:string){
    this.store.dispatch(new ResetPassword(email));
  }
  changePassword(newPassword:string){
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    this.store.dispatch(new ChangePassword(email,token,newPassword));
  }
}
