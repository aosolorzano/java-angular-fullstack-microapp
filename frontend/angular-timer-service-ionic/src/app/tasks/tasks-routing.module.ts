import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {SaveComponent} from "./components/save/save.component";
import {TasksRoutesEnum} from "./utils/routes/tasks-routes.enum";
import {TasksResolverService} from "./services/tasks-resolver.service";
import {DetailsComponent} from "./components/details/details.component";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve: {
      tasks: TasksResolverService
    }
  },
  {
    path: TasksRoutesEnum.createRoute,
    component: SaveComponent
  },
  {
    path: TasksRoutesEnum.editRoute,
    component: SaveComponent
  },
  {
    path: TasksRoutesEnum.detailsRoute,
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
