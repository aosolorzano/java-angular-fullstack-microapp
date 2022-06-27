import {Injectable} from '@angular/core';
import {Auth, Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../../../shared/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static userSessionTokenKey = 'userSessionToken';
  private static usernameKey = 'username';

  private authenticationState = new BehaviorSubject(false);
  private logger = new Logger('AuthenticationService', LOG_TYPE.DEBUG);

  constructor(private storageService: StorageService) {}

  public async userSignedIn(): Promise<void> {
    this.logger.debug('userSignedIn() - START');
    await Auth.currentSession().then((session)  => {
      this.storageService.set(AuthenticationService.userSessionTokenKey, session.getIdToken().getJwtToken());
    }).catch(err => {
      this.logger.debug('getJwtToken() - ERROR: ', err);
    });
    await Auth.currentUserInfo().then(user => {
      this.storageService.set(AuthenticationService.usernameKey, user.attributes.name);
    }).catch(err => {
      this.logger.debug('currentUserInfo() - ERROR: ', err);
    });
    this.authenticationState.next(true);
    this.logger.debug('userSignedIn() - END');
  }

  public async userSignedOut(): Promise<void> {
    await Auth.signOut({global: true}).then(() => {
      this.logger.debug('userSignedOut() - SUCCESS');
    });
    this.storageService.clear();
    this.authenticationState.next(false);
  }

  public async isAuthenticated(): Promise<boolean> {
    if (!this.authenticationState.value) {
      await Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(() => {
        this.authenticationState.next(true);
      }).catch(err => {
        this.logger.debug('isAuthenticated() - ERROR: ', err);
      });
    }
    return this.authenticationState.value;
  }

  public getUsername(): string {
    return this.storageService.get(AuthenticationService.usernameKey);
  }

  public getSessionToken(): string {
    return this.storageService.get(AuthenticationService.userSessionTokenKey);
  }

  public getAuthenticationState(): BehaviorSubject<boolean> {
    return this.authenticationState;
  }
}
