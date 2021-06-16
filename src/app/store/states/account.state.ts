import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext ,Selector} from '@ngxs/store';


import { TokenPair, User } from '../../shared/models/user';
import { Login,GetUsersData,Logout, Registration, TokenRefresh, UpdateUserData, ConfirmEmail, ResetPassword, ChangePassword} from '../actions/account.actions';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { throwError } from 'rxjs';

export interface AccountStateModel {
  loggedIn: boolean;
  tokens : TokenPair  | null;
  user : User | null;
}

@State<AccountStateModel>({
    name: 'account',
    defaults: {
      tokens: null,
      loggedIn: false,
      user : null 
    }
})

@Injectable()
export class AccountState {
 
  constructor(private authService: AccountService,private userService : UserService, private router: Router) {}
  @Selector() 
  static user (state:AccountStateModel) :User | null { 
    return state.user;
  }
  @Selector() 
  static jwtToken (state:AccountStateModel){ 
    return state.tokens?.accessToken;
  }


  @Action(Login)
  login(ctx: StateContext<AccountStateModel>, action: Login) { 
    return this.authService.login(action.payload).pipe(
      tap((result) => { 
        ctx.setState({ tokens : result, loggedIn : true ,user: null }),
        localStorage.setItem("refreshToken", result.refreshToken);
        ctx.dispatch(new GetUsersData(action.payload.email))
      }
     )
    );    
  }

  @Action(Logout)
  logout(ctx: StateContext<AccountStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          tokens: null,
          loggedIn: false,
          user : null
        }),
        localStorage.removeItem("refreshToken");
        this.router.navigate(['/']);
      }),
    );

    
  }

  @Action(Registration)
  registration(ctx: StateContext<AccountStateModel>,action:Registration){
    this.authService.register(action.payload).subscribe(
      () => {},
      (err) => {}
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
    return this.userService.getUsersInfo(action.email).pipe(
      tap(result => {
        ctx.patchState({ user:result })
      },
    ));    
  }

  @Action(UpdateUserData)
  updateUserData(ctx: StateContext<AccountStateModel>, action: UpdateUserData) {  
    return this.userService.updateUser(action.payload).subscribe(
      () =>{ ctx.dispatch(new GetUsersData(action.payload.email))}
    );    
  }

 
  
  @Action(ConfirmEmail)
  confirmEmail(ctx: null,action:ConfirmEmail){
    this.authService.confirmEmail(action.token,action.email).subscribe(
      () => {},
      (err) => {
        throwError(err.error);
      }
    )
  }
  @Action(ResetPassword)
  resetPassword(ctx: StateContext<AccountStateModel>,action:ResetPassword){
    this.authService.resetPass(action.email).subscribe(
      () => {},
      (err) => {}
    );
  }

  @Action(ChangePassword)
  changePassword(ctx: StateContext<AccountStateModel>,action:ChangePassword){
    this.authService.changePass(action.email,action.token,action.newPassword).subscribe(
      () => {},
      (err) => {}
    );
  }


}