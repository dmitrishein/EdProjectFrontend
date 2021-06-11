import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  isTokenSended !: boolean;
  errorMessage : string = "";
  constructor(private accountService : AccountService, private route : ActivatedRoute,private store : Store, private router : Router) {
    this.isTokenSended = false;
   }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['token']){
     this.isTokenSended = true;
    }
  }

  resetPassword(email:string){
    this.store.dispatch;
    this.accountService.resetPass(email).subscribe(
      () => { this.errorMessage = "Message with link was succesfully send"},
      (err) => {this.errorMessage = err.error}
    );
  }
  changePassword(newPassword:string){
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
   
    this.accountService.changePass(email,token,newPassword).subscribe(
      () => {this.errorMessage = "Password was successfuly changed. Press login button to continue"},
      (err) => {this.errorMessage = err.error}
    )
  }
}
