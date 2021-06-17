import { Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EditionState } from 'src/app/store/states/edition.state';

import { Edition } from '../../../../shared/models/edition';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

  editionList:Observable<Edition[] | undefined> = this.store.select(EditionState.editions); 

  constructor(private store : Store) { 
  }

  ngOnInit(): void {
  }
}
