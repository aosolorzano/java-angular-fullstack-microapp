import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action.types';
import {tap} from 'rxjs/operators';
import {AuthStoreKeyEnum} from "../utils/store/store-keys.enum";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {AuthPagesEnum} from "../utils/routes/auth-pages.enum";
import {Router} from "@angular/router";
import {TasksPagesEnum} from "../../tasks/utils/routes/tasks-pages.enum";

@Injectable()
export class AuthEffects {

  private logger = new Logger('AuthEffects', LOG_TYPE.DEBUG);

  constructor(private actions$: Actions, private router: Router) {
  }

  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.loginAction),
        tap(action => {
            this.logger.debug('LOGIN: Adding user data to local storage...');
            localStorage.setItem(AuthStoreKeyEnum.userDataKeyName, JSON.stringify(action.user));
          }
        )), {dispatch: false});

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logoutAction),
        tap(action => {
            this.logger.debug('LOGOUT: Removing user data from local storage...');
            localStorage.removeItem(AuthStoreKeyEnum.userDataKeyName);
          }
        )), {dispatch: false});
}
