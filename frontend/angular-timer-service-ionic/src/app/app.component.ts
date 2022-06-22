import {Component, OnInit} from '@angular/core';
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {AuthenticationService} from "./auth/services/authentication/authentication.service";
import {AppRoutesEnum} from "./shared/utils/enums/app.routes.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public loggedIn = false;
  public username = '';
  public appPages = [
    { title: 'Tasks', url: '/app/tasks/main', icon: 'calendar-number' }
  ];
  private logger = new Logger('AppComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private authService: AuthenticationService) { }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    this.authService.getAuthenticationState().subscribe(async userSignedIn => {
      this.logger.debug('Auth Service changed. Is the user signed in?: ', userSignedIn);
      if (userSignedIn) {
        this.username = await this.authService.getUsername();
        this.loggedIn = true;
      }
    });
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('signOut() - START');
    await this.authService.userSignedOut();
    this.loggedIn = false;
    await this.router.navigateByUrl(AppRoutesEnum.loginPage);
    this.logger.debug('signOut() - END');
  }

}
