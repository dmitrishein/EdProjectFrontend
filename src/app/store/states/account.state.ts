import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { State, Action, StateContext ,Selector} from '@ngxs/store';


import { TokenPair, User } from '../../shared/models/user';
import { Login,GetUsersData,Logout, Registration, TokenRefresh, UpdateUserData, ConfirmEmail, ResetPassword, ChangePassword} from '../actions/account.actions';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
 
  constructor(private authService: AccountService,private userService : UserService, private router: Router, private toast : ToastrService) {}
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
    debugger
    return this.authService.login(action.payload).pipe(
      tap((result) => { 
        ;
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
        ctx.patchState({
          tokens: null,
          loggedIn: false,
          user : null
        }),
        localStorage.removeItem("refreshToken");
        this.router.navigate(['/editions']);
      }),
    );

    
  }

  @Action(Registration)
  registration(ctx: StateContext<AccountStateModel>,action:Registration){
    return this.authService.register(action.payload).subscribe(
      () => {
        this.toast.success("Confirm your email to login","Registration Successful");
        this.router.navigate(['/editions'])
      }
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
    const context = ctx.getState(); 
    return this.userService.updateUser(action.payload).subscribe(
      () =>{ ctx.dispatch(new GetUsersData(context.user?.email!));this.toast.success("Your profile was successfully updated","Profile Updated")}
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
      () => { this.toast.success("Check your email to continue","Reset Link Sended");this.router.navigate(['/editions'])}
    );
  }

  @Action(ChangePassword)
  changePassword(ctx: StateContext<AccountStateModel>,action:ChangePassword){
    this.authService.changePass(action.email,action.token,action.newPassword).subscribe(
      () => {this.toast.success("Now Login with new Password","Password Successfully Changed");this.router.navigate(['/editions'])}
    );
  }


}