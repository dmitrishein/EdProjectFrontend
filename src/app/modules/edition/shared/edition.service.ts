import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edition } from './edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  getEditionList(){
    return this.http.get<Edition[]>(
      'https://localhost:44386/Edition/GetEditions'
    );
  }
  constructor(private http:HttpClient) { }
}
