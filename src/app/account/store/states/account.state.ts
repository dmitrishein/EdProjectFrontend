import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { TokenPair, User } from '../../models/user';
import { Login,GetUsersData,Logout } from '../actions/account.actions';
import { AccountService } from '../../services/account.service';

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
  @Selector()
  static tokens(state: AccountStateModel): TokenPair | null {
    return state.tokens;
  }
  
  @Selector()
  static accessToken(state: AccountStateModel): TokenPair | null {
    return state.tokens;
  }
  @Selector()
  static isAuthenticated(state: AccountStateModel): boolean {
    return !!state.tokens;
  }

  constructor(private authService: AccountService) {}

  @Action(Login)
  login(ctx: StateContext<AccountStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result => ctx.setState({ tokens : result, loggedIn : true, email : action.payload.email ,user: null }))
    ));    
  }
  @Action(GetUsersData)
  getUserData(ctx: StateContext<AccountStateModel>, action: GetUsersData) {
    
    const context = ctx.getState();
    return this.authService.getUsersInfo(context.email).pipe(
      tap((result => ctx.patchState({ user:result }))
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
        });
      })
    );
  }
  
}