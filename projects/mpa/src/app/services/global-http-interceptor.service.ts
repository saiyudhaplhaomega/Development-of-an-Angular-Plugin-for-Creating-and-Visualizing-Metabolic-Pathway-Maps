import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'shared-lib';
import { ErrorStatusProviderService } from './error-status-provider.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(
    public router: Router,
    private authGuard: AuthService,
    private errorStatusProvider: ErrorStatusProviderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.errorStatusProvider.resetErrorCode();
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            this.errorStatusProvider.setErrorCode(error.status);
            console.error(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401: // login
                // this.authGuard.logout();
                // this.router.navigateByUrl('/login');
                break;
              case 403: // forbidden
                // this.authGuard.logout();
                // this.router.navigateByUrl('/login');
                break;
              // case 400:
              //   console.error('Bad request');
              //   break;
              // case 404:
              //   console.error('Resource not found');
              //   break;
              // case 500:
              //   console.error('internal server error');
              //   break;
              // case 501:
              //   console.error('not implemented');
              //   break;
              // case 502:
              //   console.error('Bad gateway');
              //   break;
              // case 503:
              //   console.error('Service unavailable');
              //   break;
              // case 504:
              //   console.error('Gateway timeout');
              //   break;
              default:
                // this.router.navigateByUrl('/error');
                // handle other errors
                break;
            }
          }
          return throwError(error);
        } else {
          console.error('something else happened');
          return next.handle(req);
        }
      })
    );
  }
}
