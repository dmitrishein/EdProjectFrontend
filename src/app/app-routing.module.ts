import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './modules/account/components/email-confirmation/email-confirmation.component';
import { LoginComponent } from './modules/account/components/login/login.component';
import { PasswordResetComponent } from './modules/account/components/password-reset/password-reset.component';
import { RegisterComponent } from './modules/account/components/register/register.component';
import { EditionDetailComponent } from './modules/edition/components/edition-detail/edition-detail.component';
import { EditionEditComponent } from './modules/edition/components/edition-edit/edition-edit.component';
import { EditionListComponent } from './modules/edition/components/edition-list/edition-list.component';
import { UserProfileComponent } from './modules/user/components/user-profile/user-profile.component';
import { EditionPageComponent } from './modules/edition/components/edition-page/edition-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserGuard } from './shared/guards/user.guard';
import { CartComponent } from './modules/order/cart/cart.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',component: EditionListComponent },
      { path: 'editions',component: EditionPageComponent },
      { path: 'login',canActivate:[UserGuard], component: LoginComponent },
      { path: 'registration', canActivate:[UserGuard],component: RegisterComponent },
      { path: 'edition',canActivate:[AuthGuard], component : EditionEditComponent},
      { path: 'emailconfirmation', canActivate:[UserGuard],component: EmailConfirmationComponent},
      { path: 'resetpassword', component: PasswordResetComponent},
      { path: 'profile', canActivate:[AuthGuard], component: UserProfileComponent},
      { path: 'detail/:id', component: EditionDetailComponent},
      { path: 'cart', component: CartComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
