import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { EditionEditComponent } from './components/edition-edit/edition-edit.component';
import { EditionDetailComponent } from './components/edition-detail/edition-detail.component';


@NgModule({
  declarations: [
    EditionListComponent,
    EditionEditComponent,
    EditionDetailComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    RouterModule
  ]
})
export class EditionModule { }
