import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {compareTasks, Task} from "../../model/task";
import {TasksActions} from "../action-types";

/*
 * The EntityState is a predefined generic interface for an entity collection.
 * Extending this interface provide us any additional properties for the entity state.
 * */
export interface TasksState extends EntityState<Task> {
  allTasksLoaded: boolean
}

export const tasksEntityAdapter = createEntityAdapter<Task>({
  sortComparer: compareTasks
});

export const initialTasksState = tasksEntityAdapter.getInitialState({
  allTasksLoaded: false
});

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.storeAllTasksAction,
    (tasksState, action) => tasksEntityAdapter.addMany(action.tasksFound, {
      ...tasksState,
      allTasksLoaded: true
    })),
  on(TasksActions.removeTasksFromStoreAction,
    (tasksState, action) => initialTasksState)
);

export const {selectAll} = tasksEntityAdapter.getSelectors();
