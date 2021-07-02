import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Logout, TokenRefresh } from '../../store/actions/account.actions';
import { ToastrService } from 'ngx-toastr';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private toast : ToastrService,private store : Store) {  }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
     
      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
          //if access token expired
          if (error.status === 401) {
            this.store.dispatch(new TokenRefresh());
          }
          //if refresh token expired
          if(error.status === 403) {
             this.store.dispatch(new Logout());
          }
          return next.handle(req);
        }
      )
    )
  };
}