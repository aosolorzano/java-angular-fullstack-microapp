import {Injectable} from '@angular/core';
import {Auth, Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {select, Store} from "@ngrx/store";
import {AuthState} from "../reactive/reducers";
import {User} from "../interfaces/user";
import {getUserFullName, isLoggedIn} from "../reactive/auth.selectors";
import {Observable} from "rxjs";
import {login, logout} from "../reactive/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logger = new Logger('AuthService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AuthState>) {
  }

  public async userSignedIn(user: User): Promise<void> {
    this.logger.debug('userSignedIn() - START: ', user);
    this.store.dispatch(login({user}));
    this.logger.debug('userSignedIn() - END');
  }

  public async userSignedOut(): Promise<void> {
    await Auth.signOut({global: true}).then(() => {
      this.logger.debug('userSignedOut() - SUCCESS');
    });
    this.store.dispatch(logout());
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn)
      );
  }

  public getUserFullName(): Observable<string> {
    return this.store
      .pipe(
        select(getUserFullName)
      );
  }
}
