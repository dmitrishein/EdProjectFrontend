import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
import { EditionListComponent } from './edition/components/edition-list/edition-list.component';
const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: EditionListComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
