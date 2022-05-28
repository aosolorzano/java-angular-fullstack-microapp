import { Component, OnInit } from '@angular/core';
import {Hub, Logger} from 'aws-amplify';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private logger = new Logger('LoginPage');

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    if (!await this.authService.isAuthenticated()) {
      Hub.listen('auth', this.listener);
    }
    this.logger.debug('ngOnInit() - END ');
  }

  private listener = async (data) => {
    const cognitoAuthEvent = data.payload.event;
    this.logger.debug('listener() - START: ' + cognitoAuthEvent);
    switch (cognitoAuthEvent) {
      case 'signIn':
        this.logger.debug('Cognito event data: ', data);
        await this.authService.userSignedIn();
        await this.router.navigateByUrl('/app/pages/tasks');
        break;
      case 'signIn_failure':
        this.logger.debug('listener - User sign in failed');
        break;
    }
    this.logger.debug('listener() - END: ' + cognitoAuthEvent);
  };

}
