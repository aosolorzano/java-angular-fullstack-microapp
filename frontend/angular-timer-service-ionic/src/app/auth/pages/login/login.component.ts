import {Component, OnInit} from '@angular/core';
import {Auth, Hub, Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {TasksPagesEnum} from "../../../tasks/utils/routes/tasks-pages.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private logger = new Logger('LoginPage', LOG_TYPE.DEBUG);

  constructor(private router: Router, private authService: AuthService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    Hub.listen('auth', this.listener);
    this.logger.debug('ngOnInit() - END ');
  }

  private listener = async (data) => {
    const cognitoAuthEvent = data.payload.event;
    this.logger.debug('listener() - START: ' + cognitoAuthEvent);
    switch (cognitoAuthEvent) {
      case 'signIn':
        const cognitoSession = await Auth.currentSession();
        const cognitoUser = await Auth.currentUserInfo();
        const user: User = {
          id: cognitoUser.attributes.sub,
          name: cognitoUser.attributes.name,
          email: cognitoUser.attributes.email,
          token: cognitoSession.getIdToken().getJwtToken()
        };
        await this.authService.userSignedIn(user);
        await this.router.navigateByUrl(TasksPagesEnum.homePage);
        break;
      case 'signIn_failure':
        this.logger.debug('listener() - User sign in failed');
        break;
    }
    this.logger.debug('listener() - END');
  }

}
