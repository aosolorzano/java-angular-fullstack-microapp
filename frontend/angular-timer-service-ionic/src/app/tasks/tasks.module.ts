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
import {TasksComponent} from "./components/tasks/tasks.component";
import {TasksService} from "./services/tasks.service";
import {TasksResolver} from "./reactive/tasks.resolver";
import {EffectsModule} from "@ngrx/effects";
import {TasksEffects} from "./reactive/tasks.effects";
import {StoreModule} from "@ngrx/store";
import {tasksReducer} from "./reactive/tasks.reducers";
import {TasksStoreKeyEnum} from "./utils/common/store-keys.enum";
import {SaveComponent} from "./components/save/save.component";

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(TasksStoreKeyEnum.tasksFeatureName, tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  declarations: [
    DaysPipe,
    SearchPipe,
    HourPipe,
    MinutePipe,
    SearchComponent,
    TasksComponent,
    SaveComponent
  ],
  providers: [
    TasksResolver,
    TasksService
  ]
})
export class TasksModule {
}
