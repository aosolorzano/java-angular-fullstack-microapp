import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {AuthService} from './auth/services/auth.service';
import {AppRoutesEnum} from './shared/utils/routes/app.routes.enum';
import {StorageKeysEnum} from "./shared/utils/security/storage.keys.enum";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {title: 'Tasks', url: '/app/tasks/main', icon: 'calendar-number'}
  ];
  public username$: Observable<string>;
  public userLoggedIn$: Observable<boolean>;
  private logger = new Logger('AppComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private authService: AuthService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    const userData = localStorage.getItem(StorageKeysEnum.userDataKeyLabel);
    if (userData) {
      const user = JSON.parse(userData);
      await this.authService.userSignedIn(user);
    }
    this.userLoggedIn$ = this.authService.isUserLoggedIn();
    this.username$ = this.authService.getUserFullName();
    if (userData) {
      await this.router.navigateByUrl(AppRoutesEnum.homePage);
    }
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('signOut() - START');
    await this.authService.userSignedOut();
    await this.router.navigateByUrl(AppRoutesEnum.loginPage);
    this.logger.debug('signOut() - END');
  }
}
