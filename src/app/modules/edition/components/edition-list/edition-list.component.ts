import { Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetEditionList } from 'src/app/store/actions/edition.action';
import { Edition } from '../../../../shared/models/edition';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

  editionList:Observable<Edition[]> = this.store.select(ourState=>ourState.edition.edition); 

  constructor(private store : Store) { 
  }

  ngOnInit(): void {
  }
}
