import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {AuthState} from "../reactive/reducers";
import {getSessionToken} from "../reactive/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private logger = new Logger('AuthInterceptorService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AuthState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('intercept() - START');
    return this.store.select(getSessionToken).pipe(exhaustMap(token => {
      if (!token) {
        return next.handle(request);
      }
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
      this.logger.debug('intercept() - HTTP Request: ', request);
      return next.handle(request);
    }));
  }
}
