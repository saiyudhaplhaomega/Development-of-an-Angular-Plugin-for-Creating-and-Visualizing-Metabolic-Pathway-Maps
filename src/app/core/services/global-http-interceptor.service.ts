import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthGuard} from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router, private authGuard: AuthGuard) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      // login
                this.authGuard.logout();
                this.router.navigateByUrl('/login');
                break;
              case 403:     // forbidden
                this.authGuard.logout();
                this.router.navigateByUrl('/login');
                break;
              default:
                // handle other errors
                break;
            }
          }
          return throwError(error);
        } else {
          console.error('some thing else happened');
          return next.handle(req);
        }
      })
    );
  }
}

