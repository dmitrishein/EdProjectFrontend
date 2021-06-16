import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { EditionEditComponent } from './components/edition-edit/edition-edit.component';
import { EditionDetailComponent } from './components/edition-detail/edition-detail.component';
import { EditionPageComponent } from './components/edition-page/edition-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    EditionListComponent,
    EditionEditComponent,
    EditionDetailComponent,
    EditionPageComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule
  ]
})
export class EditionModule { }
