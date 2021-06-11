import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of} from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private _store : Store, private router : Router){

    }
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> {
        this._store.select(ourState => ourState.account.loggedIn).subscribe(
            (res) => {
                if(!res){
                    this.router.navigate(['/login']);
                    return of(false);
                }
             return of(true);
            }
        )     
        return of(true);
    }

    canActivateChild(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}