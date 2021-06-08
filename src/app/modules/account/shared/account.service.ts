import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Authenticate, RegisterUser, TokenPair, User, ChangeToken } from './user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomEncoder } from 'src/app/shared/custom.html.encoder';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  register(regUser: RegisterUser){
    return this.http.post('https://localhost:44386/Account/Registration',regUser);
  }
  confirmEmail(token : string , email : string ){
    // let params = new HttpParams({encoder: new CustomEncoder() })
    // params = params.append('token',token);
    // params = params.append('email', email);

    return this.http.post('https://localhost:44386/Account/ConfirmEmail',{token, email});
  }
  login(loginUser: Authenticate) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/Login',loginUser);
  }
  refreshToken(refreshToken : string) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/RefreshToken',{refreshToken});
  }
  logout(){
    return this.http.post('https://localhost:44386/Account/Logout',"");
  }
  
  getUsersInfo(email : string) : Observable<User> {
      return this.http.get<User>('https://localhost:44386/User/GetUserByQuery?searchString='+email);
  }
  constructor(private http:HttpClient) { }
}
