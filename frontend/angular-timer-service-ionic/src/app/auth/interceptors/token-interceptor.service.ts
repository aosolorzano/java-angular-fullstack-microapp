import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private logger = new Logger('TokenInterceptorService', LOG_TYPE.DEBUG);
  constructor(private authenticationService: AuthenticationService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('intercept() - START');
    const token: string = this.authenticationService.getSessionToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }
    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    }
    this.logger.debug('intercept() - HTTP Request: ', request);
    return next.handle(request)
      .pipe(
        map((response: HttpEvent<any>) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          this.logger.debug('intercept() - ERROR: ', error);
          return throwError(error);
        })
      );
  }
}
