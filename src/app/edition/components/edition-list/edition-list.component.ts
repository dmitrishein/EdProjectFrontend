import { Component, OnInit } from '@angular/core';
import { EditionService } from '../../services/edition.service';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.css']
})
export class EditionListComponent implements OnInit {

  editionList = this.editionService.getEditionList();
  constructor(private editionService : EditionService) { }

  ngOnInit(): void {
  }

}
