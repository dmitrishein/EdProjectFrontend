import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Store } from "@ngxs/store";

import { ToastrService } from "ngx-toastr";
@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient, private toastr: ToastrService, private store: Store) { }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
      debugger;
       return next.handle(req)
        .pipe(
          catchError((error) => {
          if (error.status === 400) {
            debugger;
            this.toastr.error(error.error);
            return EMPTY;
          }else{
            return next.handle(req);
          }
         }))
  
      };
}







// import { Injectable } from '@angular/core'
// import { Store } from '@ngxs/store';
// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { EMPTY, Observable, throwError } from 'rxjs';
// import { catchError} from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import { ToastrService } from 'ngx-toastr';


// @Injectable()

// export class ErrorsInterceptor implements HttpInterceptor {
//     constructor(private toast : ToastrService,private store : Store) {  }

//     intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
     
//       // return next.handle(req)
//       //   .pipe(
//       //     catchError((error: HttpErrorResponse) => {
//       //       debugger;
//       //       if(error.error instanceof ErrorEvent){
//       //           this.toast.error(error.message);
//       //       }else{
//       //           this.toast.error(error.error, "piska ma***");
//       //       }
//       //     return next.handle(req);
//       //   }))

//       return next.handle(req);
//   };
// }