import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { EditionEditComponent } from './components/edition-edit/edition-edit.component';


@NgModule({
  declarations: [
    EditionListComponent,
    EditionEditComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class EditionModule { }
