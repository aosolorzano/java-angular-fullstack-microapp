import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import {TasksService} from "../services/tasks.service";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {TasksActions} from "./action.types";
import {AuthActions} from "../../auth/reactive/action.types";

@Injectable()
export class TasksEffects {

  private logger = new Logger('TasksEffects', LOG_TYPE.DEBUG);

  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => this.actions$
      .pipe(
        ofType(TasksActions.findAllTasksAction),
        concatMap(action => {
          this.logger.debug('findAllTasksAction(): Calling tasksService() to retrieve all tasks.');
          return this.tasksService.findAll();
        }),
        map(tasksFound => TasksActions.storeAllTasksAction({tasksFound}))
      )
  );

  createTask$ = createEffect(() => this.actions$
      .pipe(
        ofType(TasksActions.createTaskAction),
        concatMap(action => {
          this.logger.debug('createTaskAction(): Calling tasksService() to create a task.');
          return this.tasksService.create(action.newTask);
        }),
        map(createdTask => TasksActions.storeCreatedTaskAction({createdTask}))
      )
  );

  updateTask$ = createEffect(() => this.actions$
      .pipe(
        ofType(TasksActions.updateTaskAction),
        concatMap(action => {
          this.logger.debug('updateTaskAction(): Calling tasksService() to update a task.');
          return this.tasksService.update(action.updatedTask.id, action.updatedTask.changes);
        })
      ), {dispatch: false});

  deleteTask$ = createEffect(() => this.actions$
      .pipe(
        ofType(TasksActions.deleteTaskAction),
        concatMap(action => {
          this.logger.debug('deleteTaskAction(): Calling tasksService() to delete a task.');
          return this.tasksService.delete(action.taskId);
        })
      ), {dispatch: false});

  deleteAllTasks$ = createEffect(() => this.actions$
      .pipe(
        ofType(AuthActions.logoutAction),
        map(() => {
          this.logger.debug('logoutAction(): Removing all tasks from Store.');
          return TasksActions.removeAllTasksAction()
        }))
      );
}
