import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserModel, User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsersInfo(email : string) : Observable<User> {
    return this.http.get<User>('https://localhost:44386/User/GetUserByEmail?searchString='+email);
  }

  updateUser(user : UpdateUserModel) { 
    return this.http.post('https://localhost:44386/User/UpdateUser',user);
  }
  constructor(private http:HttpClient) { }
}
