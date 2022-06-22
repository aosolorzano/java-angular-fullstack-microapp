import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {AuthenticationService} from "./authentication.service";
import {AppRoutesEnum} from "../../../shared/utils/enums/app.routes.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  private logger = new Logger('AuthenticationGuardService', LOG_TYPE.DEBUG);
  constructor(private router: Router, private authService: AuthenticationService) {}

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.logger.debug('canActivate(): ', route, state);
    const isUserLoggedIn = await this.authService.isAuthenticated();
    this.logger.debug('validateUserSession(): is user logged in?: ', isUserLoggedIn);
    if (!isUserLoggedIn) {
      await this.router.navigateByUrl(AppRoutesEnum.loginPage);
    }
    return isUserLoggedIn;
  }
}
