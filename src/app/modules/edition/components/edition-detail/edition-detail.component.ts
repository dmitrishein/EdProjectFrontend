import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Edition} from '../../../../shared/models/edition'
import { EditionState} from 'src/app/store/states/edition.state';
import { EditionService } from 'src/app/shared/services/edition.service';


@Component({
  selector: 'app-edition-detail',
  templateUrl: './edition-detail.component.html',
  styleUrls: ['./edition-detail.component.css']
})
export class EditionDetailComponent implements OnInit {
  selectedEdition$ !: Edition;

  constructor(private route : ActivatedRoute, private store:Store) { }

  ngOnInit(): void {
     this.getEdition();
  }

  getEdition(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(EditionState.getEditionById).subscribe(
      (res)=>{this.selectedEdition$ = res(id)!}
    )
  }

}
