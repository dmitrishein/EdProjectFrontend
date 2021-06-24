import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormControl,FormBuilder,FormGroup } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Store } from '@ngxs/store';
import { EditionPageParameters, EditionsType } from 'src/app/shared/models/edition';
import { Edition } from 'src/app/shared/models/edition';
import { GetDefaultEditionPage, GetEditionPage, SetPageParameters } from 'src/app/store/actions/edition.action';
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
  categories!: FormGroup;
  sliderOptions !: Options;
  selectedSize !: number;
  selectedCategories = new FormControl();
  selectedSortType !: SortType;
  searchString : string = "";

  minVal !: number;
  maxVal !: number;

  editionList !: Edition[];
  pageParams !: EditionPageParameters;
  totalItemsCount : number = 0;

  constructor(private store : Store, private fb: FormBuilder) {
    this.store.select(EditionState.getMaxPrice).subscribe(
      (maxPrice)=>{
        this.maxVal = maxPrice!;
        this.store.select(EditionState.getMinPrice).subscribe(
          (minPrice)=>{
            this.minVal = minPrice!;
            if(this.minVal === undefined || this.maxVal === undefined){
              this.sliderOptions = {
                floor: 1,
                ceil: 2034,
                translate: (value: number, label: LabelType): string => {
                  switch (label) {
                    case LabelType.Floor:
                      return "<b>Min price:</b> $" + value;
                    case LabelType.Ceil:
                      return "<b>Max price:</b> $" + value;
                    default:
                      return "$" + value;
                  }
                }
              };
            }else {
              this.sliderOptions = {
                floor: this.minVal,
                ceil: this.maxVal,
                translate: (value: number, label: LabelType): string => {
                  switch (label) {
                    case LabelType.Floor:
                      return "<b>Min price:</b> $" + value;
                    case LabelType.Ceil:
                      return "<b>Max price:</b> $" + value;
                    default:
                      return "$" + value;
                  }
                }
              };
            }
          }
        )
      }
    )
    this.store.select(EditionState.getPageParams).subscribe(
      (res)=> { 
      if(res === null){
        this.pageParams = {
          ElementsPerPage : 5,
          CurrentPageNumber : 1,
          SearchString : "",
          MaxUserPrice : this.sliderOptions.ceil!,
          MinUserPrice : this.sliderOptions.floor!,
          EditionTypes : [1,2,3],
          SortType : 0,
          IsReversed: false   
        }
        this.categories = fb.group({
          book: true,
          magazine: true,
          newspaper: true
        })
        
        this.selectedSize = this.pageSizes[0];
        this.selectedSortType = this.sortTypeList.filter(x => x.id === 1 && x.isReversed === false)[0];
      }
      else {
        this.pageParams = res!;
        this.maxVal = this.pageParams.MaxUserPrice,
        this.minVal = this.pageParams.MinUserPrice
        this.categories = fb.group({
          book: this.pageParams!.EditionTypes[0]===0?false : true,
          magazine: this.pageParams!.EditionTypes[1] === 0 ? false : true,
          newspaper: this.pageParams!.EditionTypes[2] === 0 ? false : true
        })
        this.selectedSize = this.pageSizes.filter(x=> x === res.ElementsPerPage)[0];
        this.selectedSortType = this.sortTypeList.filter(x => x.id === res.SortType && x.isReversed === res.IsReversed)[0]; 
      }      
    })
    this.getPage();
  }

  filterByCategories(){
    let checks : boolean[] = Object.values(this.categories.value);
    let selectedTypes : number[] = [
      checks[0]? 1:0,
      checks[1]? 2 :0,
      checks[2]? 3 : 0
    ]
    this.pageParams.EditionTypes = selectedTypes;
    this.pageParams.CurrentPageNumber = 1;
    console.log(this.pageParams);
    this.getPage();
  }

  resetFilter(){
    this.selectedCategories = new FormControl();
    this.pageParams.MaxUserPrice = 0;
    this.pageParams.MinUserPrice = 0;
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
                this.pageParams.MaxUserPrice = res!;
              }
            )
            this.store.select(EditionState.getMinPrice).subscribe(
              (res) => {
                this.pageParams.MinUserPrice = res!;
              }
            )
        })
    })
  }

  pageChanged(pagenum : number){
    this.pageParams.CurrentPageNumber = pagenum;
    this.getPage();
  }
  handlePageSizeChange(event:number): void {
    
    this.pageParams.ElementsPerPage = event;
    console.log(event)
    this.pageParams.CurrentPageNumber = 1;
    console.log(this.pageParams);
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
