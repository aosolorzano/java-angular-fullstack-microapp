import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Auth, Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {TasksPagesEnum} from "./tasks/utils/routes/tasks-pages.enum";
import {AuthStoreKeyEnum} from "./auth/utils/store/store-keys.enum";
import {select, Store} from "@ngrx/store";
import {AppState} from "./shared/reactive/reducers/app.reducer";
import {getUserFullName, isUserLoggedIn, isUserLoggedOut} from "./auth/reactive/auth.selectors";
import {SharedStoreKeyEnum} from "./shared/utils/storage/store-keys.enum";
import {AuthActions} from "./auth/reactive/action.types";
import {AuthPagesEnum} from "./auth/utils/routes/auth-pages.enum";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {title: 'Tasks', url: TasksPagesEnum.homePage, icon: 'calendar-number'}
  ];
  public loading = true;
  public username$: Observable<string>;
  public userLoggedIn$: Observable<boolean>;
  public userLoggedOut$: Observable<boolean>;

  private currentRoute: string;
  private logger = new Logger('AppComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private store: Store<AppState>) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    this.currentRoute = this.router.url;
    // Validate if user is logged when the page is refreshed.
    const userData = localStorage.getItem(AuthStoreKeyEnum.userDataKeyName);
    if (userData) {
      this.logger.debug('ngOnInit - User data found in local storage.');
      this.store.dispatch(AuthActions.loginAction({user: JSON.parse(userData)}));
    } else {
      this.logger.debug('ngOnInit - User is not logged in.');
    }
    // Subscribe to router events to store the actual route page.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
        this.currentRoute = event.url;
        this.logger.debug('Route Navigation End: ', this.currentRoute);
        localStorage.setItem(SharedStoreKeyEnum.actualPageKeyName, this.currentRoute);
      }
    });
    this.userLoggedIn$ = this.store.pipe(select(isUserLoggedIn));
    this.userLoggedOut$ = this.store.pipe(select(isUserLoggedOut));
    this.username$ = this.store.pipe(select(getUserFullName));
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('signOut() - START');
    this.loading = true;
    await Auth.signOut({global: true}).then(async () => {
      this.store.dispatch(AuthActions.logoutAction());
      await this.router.navigate([AuthPagesEnum.loginPage]);
      this.loading = false;
    });
    this.logger.debug('signOut() - END');
  }
}
