import {createAction, props} from '@ngrx/store';
import {Task} from "../model/task";

export const findAllTasksAction = createAction(
    "[Tasks Resolver] FIND_ALL_TASKS"
);

export const storeAllTasksAction = createAction(
    "[Tasks Effect] LOAD_TASKS",
    props<{tasksFound: Task[]}>()
);

export const removeTasksFromStoreAction = createAction(
    "[Tasks Action] REMOVE_TASKS"
);
