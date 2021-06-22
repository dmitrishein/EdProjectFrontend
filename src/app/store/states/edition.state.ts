import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Edition, EditionPageResponseModel, EditionPageParameters } from "src/app/shared/models/edition";
import { GetEditionList, GetEditionPage, SetPageParams } from '../actions/edition.action';
import { EditionService } from 'src/app/shared/services/edition.service';

export interface EditionStateModel {
    editionPage : EditionPageResponseModel| null;
    pageParamaters : EditionPageParameters | null;
}
  
@State<EditionStateModel>({
      name: 'edition',
      defaults: {
        editionPage : null,
        pageParamaters : null
    }
})

@Injectable()
export class EditionState {

    constructor(private editionService: EditionService) {}
    @Selector() static editions (state:EditionStateModel){ 
        return state.editionPage?.Editions;
    }

    @Selector() static getEditionById(state: EditionStateModel){
        return (id:number) => { 
            return state.editionPage?.Editions!.filter(edition => edition.id === id)[0];
        }
    }

    @Selector() static totalItemsAmount (state:EditionStateModel){ 
        return state.editionPage?.TotalItemsAmount;
    }
    @Selector() static getPageParams (state:EditionStateModel){ 
        return state.pageParamaters;
    }

    @Action(GetEditionList)
    getEditionList(ctx: StateContext<EditionStateModel>, action: GetEditionList){
        return this.editionService.getEditionList().pipe(
            tap((result:Edition[])=>{
                return result;
            })
        );
    }

    @Action(GetEditionPage)
    getEditionPage(ctx: StateContext<EditionStateModel>, action: GetEditionPage){
        var context = ctx.getState();
        return this.editionService.getEditionPage(context.pageParamaters).pipe(
            tap((result : EditionPageResponseModel)=>{        
                let response = Object.values(result);
                ctx.patchState({editionPage:{
                    MaxPrice : response[0],
                    MinPrice : response[1],
                    TotalItemsAmount: response[2],
                    CurrentPage : response[3],
                    Editions : response[4]
                }})    
            })
        );
    }

    @Action(SetPageParams)
    setPageParams(ctx: StateContext<EditionStateModel>, action: SetPageParams){
        if(action.params === undefined){
            ctx.patchState({pageParamaters:{
                ElementsPerPage : 5,
                CurrentPageNumber : 1,
                SearchString : "",
                MaxPrice : 0,
                MinPrice : 0,
                EditionTypes : [1,2,3],
                SortType : 0,
                IsReversed : false
            }})
            return;
        }
        
        ctx.patchState({pageParamaters: action.params});     
    }
}