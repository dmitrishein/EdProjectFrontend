import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate, TokenPair } from '../models/user';
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
  
  constructor(private http:HttpClient) { }
}
