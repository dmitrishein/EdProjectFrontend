import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Edition } from 'src/app/shared/models/edition';
import { EditionService } from 'src/app/shared/services/edition.service';

@Component({
  selector: 'app-edition-detail',
  templateUrl: './edition-detail.component.html',
  styleUrls: ['./edition-detail.component.css']
})
export class EditionDetailComponent implements OnInit {
  edition !: Edition;


  constructor(private route : ActivatedRoute, private editionService : EditionService) { }

  ngOnInit(): void {
    this.getEdition();
  }

  getEdition(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editionService.getEdition(id).subscribe((edit:Edition)=>{
      this.edition = {
        id: edit.id,
        title: edit.title,
        description: edit.description,
        price : edit.price,
        status : edit.status,
        currency : edit.currency,
        type: edit.type,
        authors: edit.authors
      },
      console.log(this.edition);
    }
    );
  }

}
