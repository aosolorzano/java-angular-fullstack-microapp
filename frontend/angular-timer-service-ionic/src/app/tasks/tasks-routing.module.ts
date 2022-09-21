import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from "./pages/task/task.component";
import {TasksComponent} from "./pages/tasks/tasks.component";
import {TasksResolver} from "./reactive/tasks.resolver";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve: {
      tasks: TasksResolver
    }
  },
  {
    path: 'create',
    component: TaskComponent
  },
  {
    path: 'update/:taskId',
    component: TaskComponent
  },
  {
    path: 'details/:taskId',
    component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
