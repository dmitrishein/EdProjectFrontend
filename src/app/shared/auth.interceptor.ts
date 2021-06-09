import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap} from 'rxjs/operators';
import { Logout, TokenRefresh } from '../modules/account/store/account.actions';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private store : Store,private router : Router) {  }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
     
      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.store.dispatch(new TokenRefresh());
          }
          if(error.status === 403) {
             this.store.dispatch(new Logout()); 
          }
          return throwError(error);
        }
      )
    )
  };
}