import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './modules/account/components/email-confirmation/email-confirmation.component';
import { LoginComponent } from './modules/account/components/login/login.component';
import { PasswordResetComponent } from './modules/account/components/password-reset/password-reset.component';
import { RegisterComponent } from './modules/account/components/register/register.component';
import { EditionEditComponent } from './modules/edition/components/edition-edit/edition-edit.component';
import { EditionListComponent } from './modules/edition/components/edition-list/edition-list.component';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',canActivate:[AuthGuard],component: EditionListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegisterComponent },
      { path: 'edition',canActivate:[AuthGuard], component : EditionEditComponent},
      { path: 'emailconfirmation',component: EmailConfirmationComponent},
      { path: 'resetpassword',component: PasswordResetComponent},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
