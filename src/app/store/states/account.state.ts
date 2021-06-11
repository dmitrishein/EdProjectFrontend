import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { State, Action, Selector, StateContext } from '@ngxs/store';


import { TokenPair, User } from '../../shared/models/user';
import { Login,GetUsersData,Logout, Registration, TokenRefresh, UpdateUserData, ConfirmEmail} from '../actions/account.actions';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { throwError } from 'rxjs';

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
 
  constructor(private authService: AccountService,private userService : UserService, private router: Router) {}

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
    return this.userService.getUsersInfo(context.email).pipe(
      tap((result => {
        ctx.patchState({ user:result })
      }),
    ));    
  }
  @Action(UpdateUserData)
  updateUserData(ctx: StateContext<AccountStateModel>, action: UpdateUserData) {  
    return this.userService.updateUser(action.payload).subscribe(
      () =>{ ctx.dispatch(new GetUsersData)}
    );    
  }

  @Action(Logout)
  logout(ctx: StateContext<AccountStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          tokens: null,
          loggedIn: false,
          email : "",
          user : null
        }),
        localStorage.removeItem("refreshToken");
        this.router.navigate(['/']);
      }),
    );

    
  }
  
  @Action(ConfirmEmail)
  confirmEmail(ctx: StateContext<AccountStateModel>,action:ConfirmEmail){
    this.authService.confirmEmail(action.token,action.email).subscribe(
      () => {},
      (err) => {
        throwError(err.error);
      }
    )
  }
}