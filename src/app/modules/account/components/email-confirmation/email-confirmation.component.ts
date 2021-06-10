import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  private isLoggedIn$!:boolean;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private accountService: AccountService,private route : ActivatedRoute, private store : Store,private router : Router) { 
    this.showError = this.showSuccess = false;
    this.errorMessage = "";
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.selectSnapshot(ourState => ourState.account.loggedIn);
    if(this.isLoggedIn$){
      this.router.navigate(['/']);
    }
    this.confirmEmail();
  }

  private confirmEmail(){
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    
    this.accountService.confirmEmail(token,email).subscribe(
      () => {
        this.showSuccess = true;

      },
      (err) => {
        this.showError=true;
        this.errorMessage = err.error;
      }
    )
  };
}
