import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmEmail} from '../../../../store/actions/account.actions';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private route : ActivatedRoute, private store : Store) { 
    this.showError = this.showSuccess = false;
    this.errorMessage = "";
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail(){
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    
    this.store.dispatch(new ConfirmEmail(token,email)).subscribe(
      () => { this.showSuccess = true; },
      (err) => { this.showError = true, this.errorMessage = err}
    );
   
  };
}
