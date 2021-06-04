import {Injectable } from '@angular/core'
import { Store } from '@ngxs/store';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(private _store : Store) {

    }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        
        const isLoggedIn = this._store.selectSnapshot(ourState => ourState.account.loggedIn);

        if(isLoggedIn){
            const accessToken = this._store.selectSnapshot(myState => myState.account.tokens.accessToken);
            req = req.clone({
            headers: req.headers.set('authorization', "Bearer " + accessToken)
        });
    }
        return next.handle(req);
    }
}