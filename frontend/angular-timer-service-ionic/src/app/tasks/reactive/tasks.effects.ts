import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import {TasksActions} from "./action-types";
import {TasksService} from "../services/tasks.service";
import {storeAllTasksAction} from "./tasks.actions";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";

@Injectable()
export class TasksEffects {

  private logger = new Logger('TasksEffects', LOG_TYPE.DEBUG);

  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => this.actions$
      .pipe(
        ofType(TasksActions.findAllTasksAction),
        concatMap(action => {
          this.logger.debug('findAllTasksAction(): Calling the tasks service to retrieve all tasks...');
          return this.tasksService.findAll();
        }),
        map(tasksFound => storeAllTasksAction({tasksFound}))
      )
  );
}
