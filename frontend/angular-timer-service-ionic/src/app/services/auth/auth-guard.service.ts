import { Injectable } from '@angular/core';
import {Logger} from 'aws-amplify';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private logger = new Logger('AuthGuardService');

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  public async canActivate(): Promise<boolean> {
    this.logger.debug('canActivate() - START');
    const isUserLoggedIn = await this.authService.isAuthenticated();
    this.logger.debug('canActivate(): is user logged in?: ', isUserLoggedIn);
    if (!isUserLoggedIn) {
      await this.router.navigateByUrl('/login');
    }
    this.logger.debug('canActivate() - END');
    return isUserLoggedIn;
  }
}
