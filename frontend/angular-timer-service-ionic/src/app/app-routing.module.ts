import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./auth/services/auth-guard.service";
import {SharedRoutesEnum} from "./shared/utils/routes/shared-routes.enum";
import {TasksRoutesEnum} from "./tasks/utils/routes/tasks-routes.enum";

const routes: Routes = [
  {
    path: '',
    redirectTo: TasksRoutesEnum.homeRoute,
    pathMatch: 'full'
  },
  {
    path: TasksRoutesEnum.homeRoute,
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
