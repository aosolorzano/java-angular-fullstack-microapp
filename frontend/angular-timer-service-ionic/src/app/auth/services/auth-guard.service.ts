import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isUserLoggedIn} from "../reactive/auth.selectors";
import {AuthPagesEnum} from "../utils/routes/auth-pages.enum";
import {AppState} from "../../shared/reactive/reducers/app.reducer";

@Injectable()
export class AuthGuardService implements CanActivate {

  private logger = new Logger('AuthGuardService', LOG_TYPE.DEBUG);

  constructor(private router: Router, private store: Store<AppState>) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.logger.debug('canActivate() - START');
    return this.store.pipe(
      select(isUserLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.logger.debug('canActivate() - User not logged in. Redirecting to Login page.');
          this.router.navigateByUrl(AuthPagesEnum.loginPage);
        }
      }));
  }
}
