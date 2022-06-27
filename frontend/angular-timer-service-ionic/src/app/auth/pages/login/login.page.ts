import {Component, OnInit} from '@angular/core';
import {Hub, Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AppRoutesEnum} from "../../../shared/utils/enums/app.routes.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private logger = new Logger('LoginPage', LOG_TYPE.DEBUG);
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    if (await this.authService.isAuthenticated()) {
      await this.router.navigateByUrl(AppRoutesEnum.homePage);
    } else {
      Hub.listen('auth', this.listener);
    }
    this.logger.debug('ngOnInit() - END ');
  }

  private listener = async (data) => {
    const cognitoAuthEvent = data.payload.event;
    this.logger.debug('listener() - START: ' + cognitoAuthEvent);
    switch (cognitoAuthEvent) {
      case 'signIn':
        await this.authService.userSignedIn();
        await this.router.navigateByUrl(AppRoutesEnum.homePage);
        break;
      case 'signIn_failure':
        this.logger.debug('listener - User sign in failed');
        break;
    }
    this.logger.debug('listener() - END');
  };

}
