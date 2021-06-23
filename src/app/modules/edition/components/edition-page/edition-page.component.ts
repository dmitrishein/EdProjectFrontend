import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormControl,FormBuilder,FormGroup } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Store } from '@ngxs/store';
import { EditionPageParameters, EditionsType } from 'src/app/shared/models/edition';
import { Edition } from 'src/app/shared/models/edition';
import { GetEditionPage, SetPageParameters } from 'src/app/store/actions/edition.action';
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
 
  sortTypeList : SortType[] = [
    {id : 1, name : "Price Ascending", isReversed : false},
    {id : 1 , name : "Price Descending", isReversed: true},
    {id : 2 , name : "Title Ascending", isReversed: false},
    {id : 2 , name : "Title Descending", isReversed: true}
  ] 
  pageSizes = [5, 10, 15];
  categories: FormGroup;


  sliderOptions !: Options;
  selectedSize : number;
  selectedCategories = new FormControl(); // selected categories by user
  selectedSortType : SortType;
  minVal !: number;
  maxVal !: number;

  editionList !: Edition[];
  pageParams !: EditionPageParameters;
  totalItemsCount : number = 0;

  constructor(private store : Store, private fb: FormBuilder) { 
    this.setPageParams();
    this.getPage();
    this.store.select(EditionState.getMaxPrice).subscribe(
      (res)=>{
        this.maxVal = res!;
      }
    )
    this.store.select(EditionState.getMaxPrice).subscribe(
      (res)=>{
        this.minVal = res!;
      }
    )
    this.sliderOptions = {
      floor: this.pageParams.MinPrice,
      ceil: this.pageParams.MaxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "<b>Min price:</b> $" + value;
          case LabelType.High:
            return "<b>Max price:</b> $" + value;
          default:
            return "$" + value;
        }
      }
    };
 
    this.selectedSortType = this.sortTypeList.find(x => x.id == this.pageParams.SortType && x.isReversed == this.pageParams.IsReversed)!;
    this.categories = fb.group({
      book: this.pageParams.EditionTypes[0]===0?false : true,
      magazine: this.pageParams.EditionTypes[1] === 0 ? false : true,
      newspaper: this.pageParams.EditionTypes[2] === 0 ? false : true
    });
    this.selectedSize = this.pageParams.ElementsPerPage;
  }

  setPageParams(){
    this.store.select(EditionState.getPageParams).subscribe(
      (res : EditionPageParameters | null)=>{
        if(res === null || res === undefined){
          this.pageParams = {
            ElementsPerPage : 5,
            CurrentPageNumber : 1,
            SearchString : "",
            MaxPrice : 0,
            MinPrice : 0,
            EditionTypes : [1,2,3],
            SortType : 0,
            IsReversed: false      
          };
          this.store.dispatch(new SetPageParameters(this.pageParams));
          return;
        }
        this.pageParams = res!;
      }
    )
  }

  filterByCategories(){
    let checks : boolean[] = Object.values(this.categories.value);
    let selectedTypes : number[] = [
      checks[0]? 1:0,
      checks[1]? 2 :0,
      checks[2]? 3 : 0
    ]
    this.pageParams.EditionTypes = selectedTypes;
    this.getPage();
  }

  resetFilter(){
    this.selectedCategories = new FormControl();
    this.pageParams.MaxPrice = 0;
    this.pageParams.MinPrice = 0;
    this.pageParams.EditionTypes = [1,2,3];
    this.getPage();
  }

  getPage(){
    this.store.dispatch(new GetEditionPage(this.pageParams)).subscribe(
      () => {
        this.store.select(EditionState.editions).subscribe(
          (editionPage) => {
            this.editionList = editionPage!;
            this.store.select(EditionState.totalItemsAmount).subscribe(
              (res) => {
                this.totalItemsCount = res!;
              }
            )
            this.store.select(EditionState.getMaxPrice).subscribe(
              (res) => {
                this.pageParams.MaxPrice = res!;
                this.sliderOptions.ceil =res!;
              }
            )
            this.store.select(EditionState.getMinPrice).subscribe(
              (res) => {
                this.pageParams.MinPrice = res!;
                this.sliderOptions.floor = res!;
              }
            )
        })
        this.store.dispatch(new SetPageParameters(this.pageParams));
        
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
