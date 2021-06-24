import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { EditionPageResponseModel, EditionPageParameters } from "src/app/shared/models/edition";
import { GetDefaultEditionPage, GetEditionPage, SetPageParameters} from '../actions/edition.action';
import { EditionService } from 'src/app/shared/services/edition.service';

export interface EditionStateModel {
    editionPage : EditionPageResponseModel| null;
    pageParameters : EditionPageParameters | null;
}
  
@State<EditionStateModel>({
      name: 'edition',
      defaults: {
        editionPage : null,
        pageParameters : null
    }
})

@Injectable()
export class EditionState {

    constructor(private editionService: EditionService) {
    }
    @Selector() static editions (state:EditionStateModel){ 
        return state.editionPage?.Editions;
    }
    @Selector() static getMinPrice (state:EditionStateModel){ 
        return state.editionPage?.MinPrice;
    }
    @Selector() static getMaxPrice (state:EditionStateModel){ 
        return state.editionPage?.MaxPrice;
    }
    @Selector() static getPageParams (state:EditionStateModel){ 
        return state!.pageParameters;
    }
    @Selector() static getEditionById(state: EditionStateModel){
        return (id:number) => { 
            return state.editionPage?.Editions!.filter(edition => edition.id === id)[0];
        }
    }
    @Selector() static totalItemsAmount (state:EditionStateModel){ 
        return state.editionPage?.TotalItemsAmount;
    }
    
    @Action(GetEditionPage)
    getEditionPage(ctx: StateContext<EditionStateModel>, action : GetEditionPage){
        return this.editionService.getEditionPage(action.params).pipe(
            tap((result : EditionPageResponseModel)=>{        
                let response = Object.values(result);
                ctx.setState({editionPage:{
                    MaxPrice : response[0],
                    MinPrice : response[1],
                    TotalItemsAmount: response[2],
                    CurrentPage : response[3],
                    Editions : response[4]
                },
                pageParameters:action.params}) 
            })
        );
    }

    @Action(SetPageParameters)
    setPageParameters(ctx: StateContext<EditionStateModel>, action : SetPageParameters){
        console.log(action.params);
        ctx.patchState({pageParameters:action.params});
    }
}