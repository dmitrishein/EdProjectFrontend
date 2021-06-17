import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import {map} from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Edition, EditionPageResponseModel } from "src/app/shared/models/edition";
import { GetEditionList, GetEditionPage } from '../actions/edition.action';
import { EditionService } from 'src/app/shared/services/edition.service';
import { $ } from 'protractor';

export interface EditionStateModel {
    editionPage : EditionPageResponseModel| null;
}
  
@State<EditionStateModel>({
      name: 'edition',
      defaults: {
        editionPage : null
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

    @Selector() static totalPagesNumber (state:EditionStateModel){ 
        console.log(state.editionPage?.TotalPagesAmount);
        return state.editionPage?.TotalPagesAmount;
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
        return this.editionService.getEditionPage(action.params).pipe(
            tap((result : EditionPageResponseModel)=>{
                let response = Object.values(result);
                ctx.setState({editionPage:{
                    TotalPagesAmount: response[0],
                    isNextPage : response[1],
                    isPrevPage : response[2],
                    CurrentPage : response[3],
                    Editions :response[4]
                }})    
            })
        );
    }
}