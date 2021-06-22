import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Edition, EditionPageResponseModel } from '../models/edition';
import { EditionPageParameters } from '../models/edition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  getEditionList(){
    return this.http.get<Edition[]>(
      'https://localhost:44386/Edition/GetEditions'
    );
  }

  getEditionPage( pageParams : EditionPageParameters | null ){
    return this.http.post<EditionPageResponseModel>(
      'https://localhost:44386/Edition/GetEditionPage', pageParams
    );
  }
  getEdition(id : number) {
    return this.http.get<Edition>('https://localhost:44386/Edition/GetEditionById?Id='+id);
  }
  constructor(private http:HttpClient) { }
}
