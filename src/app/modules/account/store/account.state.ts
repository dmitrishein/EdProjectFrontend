import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { TokenPair, User } from '../shared/user';
import { Login,GetUsersData,Logout, Registration} from './account.actions';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

export interface AccountStateModel {
  loggedIn: boolean;
  tokens : TokenPair  | null;
  email : string;
  user : User | null;
}

@State<AccountStateModel>({
    name: 'account',
    defaults: {
      tokens: null,
      loggedIn: false,
      email : '',
      user : null
    }
})

@Injectable()
export class AccountState {
 
  constructor(private authService: AccountService, private router: Router) {}

  @Action(Login)
  login(ctx: StateContext<AccountStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result => ctx.setState({ tokens : result, loggedIn : true, email : action.payload.email ,user: null }))
    ));    
  }
  // @Action(TokenChange)
  // tokenChange(ctx: StateContext<AccountStateModel>, action: TokenChange) {
  //   const context = ctx.getState();
  //   return this.authService.changeToken(action.user).pipe(
  //     tap((result => ctx.patchState({ tokens : result, loggedIn : true}))
  //   ));    
  // }
  @Action(GetUsersData)
  getUserData(ctx: StateContext<AccountStateModel>, action: GetUsersData) {   
    const context = ctx.getState();
    return this.authService.getUsersInfo(context.email).pipe(
      tap((result => {
        ctx.patchState({ user:result }),
        this.router.navigate(['/']).then(()=> window.location.reload());
      }),
    ));    
  }
 
  @Action(Logout)
  logout(ctx: StateContext<AccountStateModel>) {
    const state = ctx.getState();
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          tokens: null,
          loggedIn: false,
          email : "",
          user : null
        }),
        this.router.navigate(['/']).then(()=>window.location.reload());
      }),
      
    );

    
  }
  
}