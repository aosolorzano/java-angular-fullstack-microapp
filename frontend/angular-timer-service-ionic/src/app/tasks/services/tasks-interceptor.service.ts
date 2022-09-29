import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {AppState} from "../../shared/reactive/reducers/app.reducer";
import {catchError, EMPTY, exhaustMap, Observable} from "rxjs";
import {getSessionToken} from "../../auth/reactive/auth.selectors";
import {environment} from "../../../environments/environment";

@Injectable()
export class TasksInterceptorService implements HttpInterceptor {

  private apiUrl = environment.apiUrl;
  private logger = new Logger('TasksInterceptorService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AppState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('intercept() - START');
    return this.store
      .select(getSessionToken)
      .pipe(
        exhaustMap(token => {
          if (token) {
            request = this.setHttpUrl(request);
            request = this.setHttpHeaders(request, token);
            this.logger.debug('intercept() - HTTP Request: ', request);
          } else {
            this.logger.debug('intercept() - No token found. Removing JWT from request header.');
            request = this.verifyAndRemoveAuthToken(request);
          }
          return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              this.logger.debug('intercept() - ERROR: ', error);
              // TODO: All errors are dispatched to the Store and they are not serialized. This is a problem. So, we need to
              //  serialize the error before dispatch it to the Store.
              return EMPTY;
            }));
        })
      );
  }

  private verifyAndRemoveAuthToken(request: HttpRequest<any>) {
    if (request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.delete('Authorization')
      });
    }
    return request;
  }

  private setHttpUrl(request: HttpRequest<any>) {
    if (!request.url.startsWith('http')) {
      request = request.clone({
        url: `${this.apiUrl}/${request.url}`
      });
    }
    return request;
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
