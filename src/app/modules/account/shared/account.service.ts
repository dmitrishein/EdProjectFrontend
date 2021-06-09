import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate, RegisterUser, TokenPair, User } from './user';
import { HttpClient, HttpParams} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class AccountService {

  register(regUser: RegisterUser){
    return this.http.post('https://localhost:44386/Account/Registration',regUser);
  }
  confirmEmail(encodeToken : string , email : string ){
    const token = encodeToken.split(' ').join('+');
    return this.http.post('https://localhost:44386/Account/ConfirmEmail',{token,email});
  }
  login(loginUser: Authenticate) : Observable<TokenPair> {
    return this.http.post<TokenPair>('https://localhost:44386/Account/Login',loginUser);
  }
  resetPass(email: string){ 
    let temp = JSON.stringify({'email': email});

    return this.http.post('https://localhost:44386/Account/ResetPassword',temp, { headers:{'Content-Type' : 'application/json'} });
  }
  changePass(email : string, encodeToken:string, newPassword:string) {
    const token = encodeToken.split(' ').join('+');
    return this.http.post('https://localhost:44386/Account/ChangePassword',{email,token,newPassword});
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
