import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action.types';
import {tap} from 'rxjs/operators';
import {AuthStoreKeyEnum} from "../utils/store/store-keys.enum";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";

@Injectable()
export class AuthEffects {

  private logger = new Logger('AuthEffects', LOG_TYPE.DEBUG);

  constructor(private actions$: Actions) {
  }

  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.loginAction),
        tap(async action => {
            this.logger.debug('LOGIN_ACTION: Adding user data to local storage.');
            localStorage.setItem(AuthStoreKeyEnum.userDataKeyName, JSON.stringify(action.user));
          }
        )), {dispatch: false});

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logoutAction),
        tap(async action => {
            this.logger.debug('LOGOUT_ACTION: Removing user data from local storage.');
            localStorage.removeItem(AuthStoreKeyEnum.userDataKeyName);
          }
        )), {dispatch: false});
}
