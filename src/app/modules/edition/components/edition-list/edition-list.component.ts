import { Component, OnInit } from '@angular/core';
import { Edition } from '../../shared/edition';
import { EditionService } from '../../shared/edition.service';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

  editionList = this.editionService.getEditionList();
  selectedEdition?: Edition;

  constructor(private editionService : EditionService) { }

  ngOnInit(): void {}

  onSelect(edition:Edition) : void {
    this.selectedEdition = edition;
    console.log(this.selectedEdition);
  }
}
