import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateOrderModel } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
  createPayment(pageParams:CreateOrderModel){
    return this.http.post<number>("https://localhost:44386/Order/CreateOrder", pageParams);
  }
  
}