import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import {map} from 'rxjs/operators'
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Edition } from "src/app/shared/models/edition";
import { GetEditionList } from '../actions/edition.action';
import { EditionService } from 'src/app/shared/services/edition.service';

export interface EditionStateModel {
    edition : Edition[];
}
  
@State<EditionStateModel>({
      name: 'edition',
      defaults: {
        edition : []
    }
})

@Injectable()
export class EditionState {

    constructor(private editionService: EditionService) {}
    @Selector() static editions (state:EditionStateModel){ return state.edition;}
    @Selector() static getEditionById(state: EditionStateModel){
        return (id:number) => { 
            return state.edition!.filter(edition => edition.id === id)[0];
        }
    }

    @Action(GetEditionList)
    getEditionList(ctx: StateContext<EditionStateModel>, action: GetEditionList){
        return this.editionService.getEditionList().pipe(
            tap((result:Edition[])=>{
                return result;
            })
        );
    }
}