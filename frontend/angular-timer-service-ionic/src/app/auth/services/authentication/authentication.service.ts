import {Injectable} from '@angular/core';
import {Auth, Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationState = new BehaviorSubject(false);
  private logger = new Logger('AuthenticationService', LOG_TYPE.DEBUG);

  constructor() {
    // Nothing to implement.
  }

  public async userSignedIn() {
    this.logger.debug('userSignedIn() - START: ');
    this.authenticationState.next(true);
    this.logger.debug('userSignedIn() - END');
  }

  public async userSignedOut() {
    await Auth.signOut({global: true});
    this.authenticationState.next(false);
  }

  public async isAuthenticated(): Promise<boolean> {
    if (!this.authenticationState.value) {
      await Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(async _user => {
        this.authenticationState.next(true);
      }).catch(async err => {
        this.logger.debug('isAuthenticated() - ERROR: ', err);
      });
    }
    return this.authenticationState.value;
  }

  public async getUsername(): Promise<string> {
    let username = 'uname';
    await Auth.currentUserInfo().then(async user => {
      username = user.attributes.name;
    });
    return username;
  }

  public getAuthenticationState(): BehaviorSubject<boolean> {
    return this.authenticationState;
  }
}
