import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {TasksResolver} from "./reactive/tasks.resolver";
import {SaveComponent} from "./components/save/save.component";
import {TasksRoutesEnum} from "./utils/routes/tasks-routes.enum";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve: {
      tasks: TasksResolver
    }
  },
  {
    path: TasksRoutesEnum.createRoute,
    component: SaveComponent
  },
  {
    path: TasksRoutesEnum.editRoute,
    component: SaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
