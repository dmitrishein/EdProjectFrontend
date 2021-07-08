import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate, RegisterUser, TokenPair, User } from '../models/user';
import { HttpClient} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AccountService {

  register(regUser: RegisterUser){
    return this.http.post('https://localhost:44386/Account/Registration',regUser);
  }
  confirmEmail(token : string , email : string ){
    return this.http.post('https://localhost:44386/Account/ConfirmEmail',{token,email});
  }


  login(loginUser: Authenticate) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/Login',loginUser, { headers:{'Content-Type' : 'application/json'} });
  }
  resetPass(email: string){ 
    let temp = JSON.stringify({'email': email});
    return this.http.post('https://localhost:44386/Account/ResetPassword',temp, { headers:{'Content-Type' : 'application/json'} });
  }
  changePass(email : string, token:string, newPassword:string) {
    debugger;
    return this.http.post('https://localhost:44386/Account/ChangePassword',{email,token,newPassword}, { headers:{'Content-Type' : 'application/json'} });
  }
  refreshToken(refreshToken : string) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/RefreshToken',{refreshToken});
  }
  logout(){
    return this.http.post('https://localhost:44386/Account/Logout',"");
  }
  
  constructor(private http:HttpClient) { }
}
