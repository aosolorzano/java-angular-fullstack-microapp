import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from "./pages/task/task.component";
import {ListComponent} from "./pages/list/list.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: ListComponent
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
