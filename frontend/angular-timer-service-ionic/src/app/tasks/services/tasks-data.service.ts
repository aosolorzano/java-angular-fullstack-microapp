import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Task} from "../model/task";
import {EntityNamesEnum} from "../utils/common/entity-names.enum";

@Injectable()
export class TasksDataService extends DefaultDataService<Task> {

  constructor(public httpClient: HttpClient, public httpUrlGenerator: HttpUrlGenerator) {
    super(EntityNamesEnum.TASK, httpClient, httpUrlGenerator);
  }
}
