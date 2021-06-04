import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate, TokenPair, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  login(loginUser: Authenticate) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/Login',loginUser);
  }

  logout(){
    return this.http.post('https://localhost:44386/Account/Logout',"");
  }
  
  getUsersInfo(email : string) : Observable<User> {
      return this.http.get<User>('https://localhost:44386/User/GetUserByQuery?searchString='+email);
  }
  constructor(private http:HttpClient) { }
}
