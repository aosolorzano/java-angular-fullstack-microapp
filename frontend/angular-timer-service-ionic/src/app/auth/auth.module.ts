import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthEffects} from "./reactive/auth.effects";
import {authReducer} from "./reactive/auth.reducers";
import {AuthStoreKeyEnum} from "./utils/store/store-keys.enum";
import {LoginComponent} from "./components/login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";

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
}
