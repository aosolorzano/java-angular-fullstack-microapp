import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {AuthService} from './auth/services/auth.service';
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
  private currentRoute: string;
  private loading = true;
  private logger = new Logger('AppComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private authService: AuthService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    this.currentRoute = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.logger.debug('Route Navigation Start: ', event.url);
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
        this.currentRoute = event.url;
        this.logger.debug('Route Navigation End: ', this.currentRoute);
      }
    });
    this.userLoggedIn$ = this.authService.isUserLoggedIn();
    this.username$ = this.authService.getUserFullName();
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('signOut() - START');
    await this.authService.userLoggedOut();
    await this.router.navigateByUrl(AuthPagesEnum.loginPage);
    this.logger.debug('signOut() - END');
  }
}
