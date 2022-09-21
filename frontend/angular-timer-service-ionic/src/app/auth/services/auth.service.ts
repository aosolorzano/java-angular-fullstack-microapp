import {Injectable} from '@angular/core';
import {Auth, Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {select, Store} from "@ngrx/store";
import {User} from "../model/user";
import {getUserFullName, isLoggedIn} from "../reactive/auth.selectors";
import {Observable} from "rxjs";
import {loginAction, logoutAction} from "../reactive/auth.actions";
import {AppState} from "../../shared/reactive/reducers";
import {removeTasksFromStoreAction} from "../../tasks/reactive/tasks.actions";

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService', LOG_TYPE.DEBUG);

  constructor(private store: Store<AppState>) {
  }

  public async userLoggedIn(user: User): Promise<void> {
    this.logger.debug('userLoggedIn() - START');
    this.store.dispatch(loginAction({user}));
    this.logger.debug('userLoggedIn() - END');
  }

  public async userLoggedOut(): Promise<void> {
    await Auth.signOut({global: true}).then(() => {
      this.logger.debug('userLoggedOut() - SUCCESS');
      this.store.dispatch(removeTasksFromStoreAction());
      this.store.dispatch(logoutAction());
    });
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn)
    );
  }

  public getUserFullName(): Observable<string> {
    return this.store.pipe(
      select(getUserFullName)
    );
  }
}
