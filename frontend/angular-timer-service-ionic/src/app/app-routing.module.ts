import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./auth/services/auth-guard.service";
import {SharedRoutesEnum} from "./shared/utils/routes/shared-routes.enum";
import {TasksRoutesEnum} from "./tasks/utils/routes/tasks-routes.enum";
import {AuthRoutesEnum} from "./auth/utils/routes/auth-routes.enum";

const routes: Routes = [
  {
    path: AuthRoutesEnum.loginRoute,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: TasksRoutesEnum.tasksRoute,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: SharedRoutesEnum.errorRoute,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '**',
    redirectTo: SharedRoutesEnum.notFoundRoute
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
