import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Authenticate, RegisterUser, TokenPair, User } from './user';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  register(regUser: RegisterUser){
    return this.http.post('https://localhost:44386/Account/Registration',regUser);
  }

  login(loginUser: Authenticate) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/Login',loginUser);
  }
  changeToken(user : User) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/ChangeToken',user);
  }
  logout(){
    return this.http.post('https://localhost:44386/Account/Logout',"");
  }
  
  getUsersInfo(email : string) : Observable<User> {
      return this.http.get<User>('https://localhost:44386/User/GetUserByQuery?searchString='+email);
  }
  constructor(private http:HttpClient) { }
}
