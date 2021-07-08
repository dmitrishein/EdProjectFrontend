import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edition, EditionPageResponseModel } from '../models/edition';
import { EditionPageParameters } from '../models/edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  getEditionPage( pageParams : EditionPageParameters | null ){
    
    return this.http.post<EditionPageResponseModel>(
      'https://localhost:44386/Edition/GetEditionPage', pageParams
    );
  }
  constructor(private http:HttpClient) { }
}
