import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    EditionListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class EditionModule { }
