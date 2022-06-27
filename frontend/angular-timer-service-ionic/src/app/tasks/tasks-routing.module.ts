import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from "./pages/task/task.component";
import {TasksComponent} from "./pages/tasks/tasks.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: TasksComponent
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
      },
      {
        path: '**',
        redirectTo: 'main'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
