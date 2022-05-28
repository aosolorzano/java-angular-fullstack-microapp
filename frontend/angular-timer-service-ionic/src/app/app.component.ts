import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Logger} from 'aws-amplify';
import {AuthenticationService} from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {title: 'Tasks', url: '/pages/tasks', icon: 'task'},
  ];
  public loggedIn = false;
  private logger = new Logger('AppComponent');

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit - START');
    this.authService.getAuthenticationState().subscribe(async userSignedIn => {
      this.logger.debug('Auth Service changed. User SignedIn?: ', userSignedIn);
      if (userSignedIn) {
        if (!this.loggedIn) {
          this.loggedIn = true;
        }
      }
    });
    this.logger.debug('ngOnInit - END');
  }

  public async signOut() {
    this.logger.debug('userSignedOut() - START');
    await this.authService.userSignedOut();
    this.loggedIn = false;
    await this.router.navigateByUrl('/login');
    this.logger.debug('userSignedOut() - END');
  }
}
