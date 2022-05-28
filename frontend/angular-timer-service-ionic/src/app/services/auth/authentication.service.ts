import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Auth, Logger} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private logger = new Logger('AuthenticationService');
  private authenticationState = new BehaviorSubject(false);

  constructor() {
    // Nothing to implement
  }

  public async userSignedIn() {
    this.logger.debug('userSignedIn() - START: ');
    this.authenticationState.next(true);
    this.logger.debug('userSignedIn() - END');
  }

  public async userSignedOut() {
    this.logger.debug('userSignedOut() - START');
    await Auth.signOut({global: true});
    this.authenticationState.next(false);
    this.logger.debug('userSignedOut() - END');
  }

  public async isAuthenticated(): Promise<boolean> {
    this.logger.debug('isAuthenticated: ', this.authenticationState.value);
    if (!this.authenticationState.value) {
      await Auth.currentAuthenticatedUser({
        // If set to true, this call will send a request to Cognito to get the latest user data.
        bypassCache: false
      }).then(async user => {
        this.logger.debug('isAuthenticated(): user retrieved from Amplify cache: ', user);
        await this.userSignedIn();
      }).catch(async err => {
        this.logger.debug('isAuthenticated(): ', err);
      });
    }
    return this.authenticationState.value;
  }

  public getAuthenticationState(): BehaviorSubject<boolean> {
    return this.authenticationState;
  }
}
