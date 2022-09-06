import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action.types';
import {tap} from 'rxjs/operators';
import {AuthStoreKeyEnum} from "../utils/security/store-keys.enum";
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
        ofType(AuthActions.login),
        tap(action => {
            localStorage.setItem(AuthStoreKeyEnum.userDataKeyName, JSON.stringify(action.user))
            this.logger.debug('createEffect() - LOGIN');
          }
        )), {dispatch: false});

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap(action => {
            localStorage.removeItem(AuthStoreKeyEnum.userDataKeyName);
            this.logger.debug('createEffect() - LOGOUT');
          }
        )), {dispatch: false});


}
