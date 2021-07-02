import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmEmail} from '../../../../store/actions/account.actions';
import { AccountService } from '../../../../shared/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public errorMessage: string;

  constructor(private route : ActivatedRoute, private store : Store, private toast : ToastrService, private router : Router) { 
    this.errorMessage = "";
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail(){
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    
    this.store.dispatch(new ConfirmEmail(token,email)).subscribe(
      () => { 
        this.toast.success("Email successful confirmed");
        this.router.navigate(['/editions']);
      },
      (err) => { this.toast.error(err)}
    );
   
  };
}
