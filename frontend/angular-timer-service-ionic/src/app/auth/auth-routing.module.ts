import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthRoutesEnum} from "./utils/routes/auth-routes.enum";

const routes: Routes = [
  {
    path: '',
    redirectTo: AuthRoutesEnum.loginRoute,
    pathMatch: 'full'
  },
  {
    path: AuthRoutesEnum.loginRoute,
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
