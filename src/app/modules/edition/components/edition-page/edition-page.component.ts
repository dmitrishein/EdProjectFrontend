import { Component, Input,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditionPageParameters, EditionsType } from 'src/app/shared/models/edition';
import { Edition } from 'src/app/shared/models/edition';
import { GetEditionPage } from 'src/app/store/actions/edition.action';
import { EditionState } from 'src/app/store/states/edition.state';

export interface Categ {
  id : number,
  name : string
}

@Component({
  selector: 'app-edition-page',
  templateUrl: './edition-page.component.html',
  styleUrls: ['./edition-page.component.css']
})
export class EditionPageComponent implements OnInit {
  categories = new FormControl();
  categoriesList : Categ[] = [
    {id : 1,name : "Edition"},
    {id : 2, name : "Magazine"},
    {id : 3, name : "Newspaper"}
    
  ]
  
  editionList !: Edition[];

  pageParams : EditionPageParameters = {
    ElementsPerPage : 3,
    CurrentPageNumber : 1,
    SearchString : "",
    MaxPrice : 0,
    MinPrice : 0,
    EditionTypes : [1,2,3]
  };
  pageSizes = [3, 6, 9];
  totalItemsCount :number = 0;

  constructor(private store : Store, fb : FormBuilder) { 
    this.getPage();
  }

  filter(){
    let selectedId :Categ[] = this.categories.value;
    if(selectedId === null){
      console.log("poshel nahui");
      return;
    }
    this.pageParams.EditionTypes = selectedId.map(item => item.id);

    this.getPage();
  }

  getPage(){
    console.log(this.pageParams.SearchString);
    this.store.dispatch(new GetEditionPage(this.pageParams)).subscribe(
      () => {
        this.store.select(EditionState.editions).subscribe(
          (res) => {
            this.editionList = res!;
            this.store.select(EditionState.totalItemsAmount).subscribe(
              (res) => {
                this.totalItemsCount = res!;
              }
            )
          }
        )
      }
    )
  }

  pageChanged(pagenum : number){
    this.pageParams.CurrentPageNumber = pagenum;
    this.getPage();
  }

  handlePageSizeChange(event:any): void {
    this.pageParams.ElementsPerPage = event.target.value;
    this.pageParams.CurrentPageNumber = 1;
    this.getPage();
  }
  ngOnInit(): void {

  }
}
