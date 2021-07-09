import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl,FormBuilder,FormGroup } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Store } from '@ngxs/store';
import { EditionPageParameters } from 'src/app/shared/models/edition';
import { Edition } from 'src/app/shared/models/edition';
import { GetEditionPage, SetPageParameters } from 'src/app/store/actions/edition.action';
import { EditionState } from 'src/app/store/states/edition.state';
import { AddOrderItem ,RemoveOrderItem } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { ToastrService } from 'ngx-toastr';

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
 
//TODO : add more CONSTANTS

  sortTypeList : SortType[] = [
    {id : 1, name : "Price : From Low to High", isReversed : false},
    {id : 1 , name : "Price : From High to Low", isReversed: true},
    {id : 2 , name : "Title : A-Z", isReversed: false},
    {id : 2 , name : "Title : Z-A", isReversed: true}
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

  constructor(private toast : ToastrService,private store : Store, private fb: FormBuilder) {
    this.store.select(EditionState.getMaxPrice).subscribe(
      (maxPrice)=>{
        debugger;
        this.maxVal = maxPrice!;
        this.store.select(EditionState.getMinPrice).subscribe(
          (minPrice)=>{
            this.minVal = minPrice!;
            if(this.minVal === undefined || this.maxVal === undefined){
              this.sliderOptions = {
                floor: 0.5,
                ceil: 20000.23,
                step: 0.5,
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
            }else {
              this.sliderOptions = {
                floor: this.minVal,
                ceil: this.maxVal,
                step: 0.5,
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
          SortType : 1,
          IsReversed: false   
        }
        this.categories = fb.group({
          book: true,
          magazine: true,
          newspaper: true
        })
        // this.minVal = this.sliderOptions.floor!;
        // this.maxVal = this.sliderOptions.ceil!;
        this.selectedSize = this.pageSizes[0];
        this.selectedSortType = this.sortTypeList.find(x => x.id === 1 && !x.isReversed)!;
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
        this.selectedSortType = this.sortTypeList.find(x => x.id === res.SortType && x.isReversed === res.IsReversed)!;
      }      
    })
    
    this.getPage();
  }

  filterByCategories(){
    let checks : boolean[] = Object.values(this.categories.value);
    let selectedTypes : number[] = [
      checks[0]? 1 : 0,
      checks[1]? 2 : 0,
      checks[2]? 3 : 0
    ]
    this.pageParams.EditionTypes = selectedTypes;
    this.pageParams.CurrentPageNumber = 1;
    this.pageParams.MinUserPrice = this.minVal;
    this.pageParams.MaxUserPrice = this.maxVal;
    this.getPage();
  }
  resetFilter(){
    this.categories = this.fb.group({
      book: true,
      magazine: true,
      newspaper: true
    })
    this.maxVal= 1000;
    this.minVal = 1;
    this.pageParams.MaxUserPrice = this.maxVal;
    this.pageParams.MinUserPrice = this.minVal;
    this.pageParams.EditionTypes = [1,2,3];
    this.getPage();
  }
  getPage(){
    this.store.dispatch(new SetPageParameters(this.pageParams));
    this.store.dispatch(new GetEditionPage(this.pageParams));
    this.store.select(EditionState.editions).subscribe(
          (editionPage) => {
            this.editionList = editionPage!;
            this.store.select(EditionState.totalItemsAmount).subscribe(
              (res) => {
                this.totalItemsCount = res!;
              }
            )

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

  addToCart(edit:Edition){
    this.store.dispatch(new AddOrderItem(edit));
    this.toast.success( `"${edit.title}" added to cart`)
  }
  removeFromCart(edition : Edition){
    this.store.dispatch(new RemoveOrderItem(edition.id));
    this.toast.error( `"${edition.title}" removed from cart`)
  }
  isInCart(edit:Edition):boolean{
    let flag = false;
    this.store.select(OrderState.isInCart).subscribe(
      (res)=>{ return flag = res(edit);}
    )
    return flag;
  }

  ngOnInit(): void {
    
  }

}
