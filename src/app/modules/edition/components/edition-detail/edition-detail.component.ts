import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edition } from 'src/app/shared/models/edition';
import { EditionService } from 'src/app/shared/services/edition.service';

@Component({
  selector: 'app-edition-detail',
  templateUrl: './edition-detail.component.html',
  styleUrls: ['./edition-detail.component.css']
})
export class EditionDetailComponent implements OnInit {

  constructor(private route : ActivatedRoute, private editionService : EditionService) { }
  edition !: any;
  ngOnInit(): void {
    this.getEdition();
  }

  getEdition(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.edition = this.editionService.getEdition(id);
    console.log(this.edition);
  }

}
