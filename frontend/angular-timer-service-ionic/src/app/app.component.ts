import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {AuthService} from './auth/services/auth.service';
import {AuthStoreKeyEnum} from "./auth/utils/security/store-keys.enum";
import {AuthPagesEnum} from "./auth/utils/routes/auth-pages.enum";
import {TasksPagesEnum} from "./tasks/utils/routes/tasks-pages.enum";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {title: 'Tasks', url: TasksPagesEnum.homePage, icon: 'calendar-number'}
  ];
  public username$: Observable<string>;
  public userLoggedIn$: Observable<boolean>;
  private logger = new Logger('AppComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private authService: AuthService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    const userData = localStorage.getItem(AuthStoreKeyEnum.userDataKeyName);
    if (userData) {
      const user = JSON.parse(userData);
      await this.authService.userSignedIn(user);
    }
    this.userLoggedIn$ = this.authService.isUserLoggedIn();
    this.username$ = this.authService.getUserFullName();
    if (userData) {
      await this.router.navigateByUrl(TasksPagesEnum.homePage);
    }
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('signOut() - START');
    await this.authService.userSignedOut();
    await this.router.navigateByUrl(AuthPagesEnum.loginPage);
    this.logger.debug('signOut() - END');
  }
}
