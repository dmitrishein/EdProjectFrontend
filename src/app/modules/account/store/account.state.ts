import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { TokenPair, User } from '../shared/user';
import { Login,GetUsersData,Logout, Registration, TokenRefresh} from './account.actions';
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
      tap((result) => { 
        ctx.setState({ tokens : result, loggedIn : true, email : action.payload.email ,user: null }),
        localStorage.setItem("refreshToken", result.refreshToken);
      }
     )
    );    
  }
  @Action(TokenRefresh)
  tokenRefresh(ctx: StateContext<AccountStateModel>, action: TokenRefresh) {
    const refreshToken = localStorage.getItem("refreshToken")!;

    return this.authService.refreshToken(refreshToken).pipe(
      tap((result) => 
          {ctx.patchState({ tokens : result, loggedIn : true}),
          localStorage.setItem("refreshToken",result.refreshToken);
        }
      )
    );    
  }
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