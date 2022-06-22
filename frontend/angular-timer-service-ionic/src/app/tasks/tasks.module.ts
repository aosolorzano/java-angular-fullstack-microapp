import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from './tasks-routing.module';
import {SharedModule} from "../shared/shared.module";
import {DaysPipe} from "./pipes/days.pipe";
import {SearchPipe} from "./pipes/search.pipe";
import {HourPipe} from "./pipes/hour.pipe";
import {MinutePipe} from "./pipes/minute.pipe";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from "./components/search/search.component";
import {ListComponent} from "./pages/list/list.component";
import {TaskComponent} from "./pages/task/task.component";

@NgModule({
  declarations: [
    DaysPipe,
    SearchPipe,
    HourPipe,
    MinutePipe,
    SearchComponent,
    ListComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TasksModule {
}
