import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
import { EditionEditComponent } from './edition/components/edition-edit/edition-edit.component';
import { EditionListComponent } from './edition/components/edition-list/edition-list.component';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: EditionListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'edition',canActivate:[AuthGuard], component : EditionEditComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
