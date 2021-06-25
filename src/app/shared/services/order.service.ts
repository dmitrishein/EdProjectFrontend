import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
  createPayment(pageParams:any){
      debugger;
    return this.http.post(
        "https://localhost:44386/Order/CreatePayment", pageParams);
  }
  
}