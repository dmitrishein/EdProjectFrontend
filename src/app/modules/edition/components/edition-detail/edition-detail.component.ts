import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Edition} from '../../../../shared/models/edition'
import { EditionState} from 'src/app/store/states/edition.state';
import { AddOrderItem ,RemoveOrderItem } from 'src/app/store/actions/order.action';
import { OrderState } from 'src/app/store/states/order.state';


@Component({
  selector: 'app-edition-detail',
  templateUrl: './edition-detail.component.html',
  styleUrls: ['./edition-detail.component.css']
})
export class EditionDetailComponent implements OnInit {
  selectedEdition$ !: Edition;

  constructor(private route : ActivatedRoute, private store:Store) { }

  ngOnInit(): void {
     this.getEdition();
  }
  isInCart(edit:Edition):boolean{
    let flag = false;
    this.store.select(OrderState.isInCart).subscribe(
      (res)=>{ return flag = res(edit);}
    )
    return flag;
  }
  addToCart(edit:Edition){
    this.store.dispatch(new AddOrderItem(edit));
  }
  removeFromCart(editId : number){
    this.store.dispatch(new RemoveOrderItem(editId));
  }
  getEdition(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(EditionState.getEditionById).subscribe(
      (res)=>{this.selectedEdition$ = res(id)!}
    )
  }

}
