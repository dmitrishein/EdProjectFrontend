import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Edition } from '../../../../shared/models/edition';
import { EditionService } from '../../../../shared/services/edition.service';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

  editionList : Observable<Edition[]>;
  selectedEdition?: Edition;

  constructor(private editionService : EditionService) { 
    this.editionList =  this.editionService.getEditionList();
  }

  ngOnInit(): void {
  }

  onSelect(edition:Edition) : void {
    this.selectedEdition = edition;
  }
}
