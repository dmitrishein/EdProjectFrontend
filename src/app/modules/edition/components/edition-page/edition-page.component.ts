import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditionPageParameters } from 'src/app/shared/models/edition';
import { GetEditionPage } from 'src/app/store/actions/edition.action';
import { Edition } from 'src/app/shared/models/edition';
import { EditionState } from 'src/app/store/states/edition.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edition-page',
  templateUrl: './edition-page.component.html',
  styleUrls: ['./edition-page.component.css']
})
export class EditionPageComponent implements OnInit {

  pageParams : EditionPageParameters = {
    ElementsPerPage : 2,
    CurrentPageNumber : 1,
    SearchString : "",
    MaxPrice : 0,
    MinPrice : 0,
    EditionTypes : [1,2,3]
  };

  editionList !: Edition[];
  totalAmountPages : number =2;

  constructor(private store : Store) { 
    this.getPage();
  }


  getPage(){
    this.store.select(EditionState.editions).subscribe(
      (res) => {
        this.editionList = res!;
      }
    )
  }

  onChangePage(ochko: any) {
    // update current page of items
    this.editionList = ochko;
}
  ngOnInit(): void {
    
  }
}
