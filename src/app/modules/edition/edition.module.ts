import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { EditionEditComponent } from './components/edition-edit/edition-edit.component';
import { EditionDetailComponent } from './components/edition-detail/edition-detail.component';
import { EditionPageComponent } from './components/edition-page/edition-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule}  from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';





@NgModule({
  declarations: [
    EditionListComponent,
    EditionEditComponent,
    EditionDetailComponent,
    EditionPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    NgxPaginationModule,
    RouterModule
  ]
})
export class EditionModule { }
