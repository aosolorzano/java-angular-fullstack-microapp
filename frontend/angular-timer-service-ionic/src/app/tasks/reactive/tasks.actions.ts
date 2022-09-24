import {createAction, props} from '@ngrx/store';
import {Task} from "../model/task";
import {Update} from "@ngrx/entity";

/* *************************************
 * ************ CRUD ACTIONS ***********
 * *************************************/
export const createTaskAction = createAction(
  "[Tasks Component] CREATE_ACTION",
  props<{ newTask: Task }>()
);

export const updateTaskAction = createAction(
  "[Task Component] UPDATE_ACTION",
  props<{ updatedTask: Update<Task> }>()
);

export const deleteTaskAction = createAction(
  "[Task Component] DELETE_ACTION",
  props<{ taskId: string }>()
);

export const findAllTasksAction = createAction(
  "[Tasks Resolver] FIND_ALL_ACTION"
);

/* *************************************
 * *********** ACTION EFFECTS **********
 * *************************************/
export const storeAllTasksAction = createAction(
  "[Tasks Effect] STORE_ALL",
  props<{ tasksFound: Task[] }>()
);

export const storeCreatedTaskAction = createAction(
  "[Tasks Effect] STORE_CREATED",
  props<{ createdTask: Task }>()
);

/* *************************************
 * ********** GENERAL ACTIONS **********
 * *************************************/
export const removeAllTasksAction = createAction(
  "[Logout Action] REMOVE_TASKS_ACTION"
);
