import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isLoggedIn} from "../reactive/auth.selectors";
import {AppState} from "../../reducers";
import {AuthPagesEnum} from "../utils/routes/auth-pages.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private logger = new Logger('AuthGuardService', LOG_TYPE.DEBUG);

  constructor(private router: Router, private store: Store<AppState>) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.logger.debug('canActivate() - START');
    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigateByUrl(AuthPagesEnum.loginPage);
          }
        })
      );
  }
}
