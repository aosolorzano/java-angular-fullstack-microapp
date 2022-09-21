import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {getSessionToken} from "../reactive/auth.selectors";
import {AppState} from "../../shared/reactive/reducers";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private logger = new Logger('AuthInterceptorService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AppState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('intercept() - START');
    return this.store.select(getSessionToken).pipe(exhaustMap(token => {
      if (!token) {
        return next.handle(request);
      }
      request = this.setHttpHeaders(request, token);
      this.logger.debug('intercept() - HTTP Request: ', request);
      return next.handle(request);
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
