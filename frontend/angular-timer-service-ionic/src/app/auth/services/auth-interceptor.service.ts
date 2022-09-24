import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, exhaustMap, Observable, throwError} from "rxjs";
import {Store} from "@ngrx/store";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {getSessionToken} from "../reactive/auth.selectors";
import {AuthState} from "../reactive/auth.reducers";
import {map} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private logger = new Logger('AuthInterceptorService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AuthState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('intercept() - START');
    return this.store
      .select(getSessionToken)
      .pipe(
        exhaustMap(token => {
          request = this.setHttpHeaders(request, token);
          this.logger.debug('intercept() - HTTP Request: ', request);
          return next.handle(request)
            .pipe(
              map((response) => {
                this.logger.debug('intercept() - HTTP Response: ', response);
                return response;
              }),
              // TODO: implement retry(this.maxRetries) and delayWhen(this.delay) to retry failed requests.
              catchError((error: HttpErrorResponse) => {
                const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                return throwError(() => new Error(errorMsg));
              })
            );
        }));
  }

  private setHttpHeaders(request: HttpRequest<any>, token: string): HttpRequest<any> {
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
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
    return request;
  }
}
