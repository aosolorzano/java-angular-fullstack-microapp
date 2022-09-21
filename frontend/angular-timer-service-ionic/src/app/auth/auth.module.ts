import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {LoginComponent} from "./pages/login/login.component";

import {AuthEffects} from "./reactive/auth.effects";
import {authReducer} from "./reactive/reducers/auth.reducers";
import {AuthStoreKeyEnum} from "./utils/store/store-keys.enum";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AmplifyAuthenticatorModule,
    StoreModule.forFeature(AuthStoreKeyEnum.authFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuardService,
        AuthInterceptorService
      ]
    }
  }
}
