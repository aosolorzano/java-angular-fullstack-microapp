import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginComponent} from "./components/login/login.component";
import {AuthEffects} from "./reactive/auth.effects";
import {AuthStoreKeyEnum} from "./utils/store/store-keys.enum";
import {authReducer} from "./reactive/auth.reducers";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    AmplifyAuthenticatorModule,
    StoreModule.forFeature(AuthStoreKeyEnum.authFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuardService
      ]
    }
  }
}
