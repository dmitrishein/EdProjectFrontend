import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Logout } from '../modules/account/store/account.actions';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private _store : Store) {

    }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        
        const isLoggedIn = this._store.selectSnapshot(ourState => ourState.account.loggedIn);
        const userEmail = this._store.selectSnapshot(state => state.account.user);
        return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && isLoggedIn) {
              this._store.dispatch(new Logout());
              console.log(userEmail);
            }
            return next.handle(req);
          })
        )
    }
}