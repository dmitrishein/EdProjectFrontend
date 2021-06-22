import { Component, Input,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditionPageParameters, EditionsType } from 'src/app/shared/models/edition';
import { Edition } from 'src/app/shared/models/edition';
import { GetEditionPage, SetPageParams } from 'src/app/store/actions/edition.action';
import { EditionState } from 'src/app/store/states/edition.state';

export interface Categories {
  id : number,
  name : string
}
export interface SortType {
  id : number,
  name : string,
  isReversed : boolean
}

@Component({
  selector: 'app-edition-page',
  templateUrl: './edition-page.component.html',
  styleUrls: ['./edition-page.component.css']
})
export class EditionPageComponent implements OnInit {
 
  categoriesList : Categories[] = [
    {id : 1,name : "Edition"},
    {id : 2, name : "Magazine"},
    {id : 3, name : "Newspaper"}
    
  ]
  sortTypeList : SortType[] = [
    {id : 1, name : "Price Ascending", isReversed : false},
    {id : 1 , name : "Price Descending", isReversed: true},
    {id : 2 , name : "Title Ascending", isReversed: false},
    {id : 2 , name : "Title Descending", isReversed: true}
  ] 

  selectedCategories = new FormControl(); // selected categories by user
  selectedSortType = this.sortTypeList[0];

  editionList !: Edition[];
  pageParams !: EditionPageParameters;
  pageSizes = [5, 10, 15];
  totalItemsCount : number = 0;

  constructor(private store : Store) { 
    this.store.select(EditionState.getPageParams).subscribe(
      (res)=>{
        this.pageParams = res!;
      }
    )
    this.getPage();
  }

  filterByCategories(){
    let selectedId :Categories[] = this.selectedCategories.value;
    console.log(selectedId);
    if(selectedId === null || selectedId.length === 0){
      this.pageParams.CurrentPageNumber = 1;
      this.pageParams.EditionTypes = [1,2,3];
      this.getPage();
      return;
    }
    this.pageParams.EditionTypes = selectedId.map(item => item.id);
    this.getPage();
  }
  getPage(){
    console.log(this.pageParams);
    this.store.dispatch(new SetPageParams(this.pageParams));
    this.store.dispatch(new GetEditionPage()).subscribe(
      () => {
        this.store.select(EditionState.editions).subscribe(
          (editionPage) => {
            this.editionList = editionPage!;
            this.store.select(EditionState.totalItemsAmount).subscribe(
              (res) => {
                this.totalItemsCount = res!;
              }
            )
          })
      })
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
  handlePageSorting(event:SortType): void {
    this.pageParams.SortType = event.id,
    this.pageParams.IsReversed = event.isReversed,
    this.pageParams.CurrentPageNumber = 1;
    this.getPage();
  }

  ngOnInit(): void {
    
  }

}
