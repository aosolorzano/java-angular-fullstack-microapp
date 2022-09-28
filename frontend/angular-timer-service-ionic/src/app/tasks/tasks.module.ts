import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from './tasks-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TasksInterceptorService} from "./services/tasks-interceptor.service";

import {DaysPipe} from "./pipes/days.pipe";
import {SearchPipe} from "./pipes/search.pipe";
import {HourPipe} from "./pipes/hour.pipe";
import {MinutePipe} from "./pipes/minute.pipe";

import {TasksEntityService} from "./services/tasks-entity.service";
import {EntityDataService, EntityDefinitionService} from "@ngrx/data";
import {TasksDataService} from "./services/tasks-data.service";
import {TasksResolverService} from "./services/tasks-resolver.service";

import {SearchComponent} from "./components/search/search.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {SaveComponent} from "./components/save/save.component";
import {DetailsComponent} from "./components/details/details.component";

import {EntityNamesEnum} from "./utils/common/entity-names.enum";
import {entityMetadata} from "./reactive/entity.metadata";

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    DaysPipe,
    SearchPipe,
    HourPipe,
    MinutePipe,
    SearchComponent,
    TasksComponent,
    SaveComponent,
    DetailsComponent
  ],
  providers: [
    TasksDataService,
    TasksEntityService,
    TasksResolverService,
    {provide: HTTP_INTERCEPTORS, useClass: TasksInterceptorService, multi: true}
  ]
})
export class TasksModule {
  constructor(private eds: EntityDefinitionService,
              private entityDataService: EntityDataService,
              private tasksDataService: TasksDataService) {
    this.eds.registerMetadataMap(entityMetadata);
    this.entityDataService.registerService(EntityNamesEnum.TASK, this.tasksDataService);
  }
}
