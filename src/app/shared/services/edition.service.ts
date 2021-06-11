import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edition } from '../models/edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  getEditionList(){
    return this.http.get<Edition[]>(
      'https://localhost:44386/Edition/GetEditions'
    );
  }
  getEdition(id : number) {
    return this.http.get<Edition>('https://localhost:44386/Edition/GetEditionById?Id='+id);
  }
  constructor(private http:HttpClient) { }
}
