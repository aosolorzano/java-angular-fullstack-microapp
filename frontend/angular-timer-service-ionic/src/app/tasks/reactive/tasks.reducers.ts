import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {compareTasks, Task} from "../model/task";
import {TasksActions} from "./action.types";

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
  on(TasksActions.storeAllTasksAction, (currentState: EntityState<Task>, action) =>
    tasksEntityAdapter.addMany(action.tasksFound, {
      ...currentState,
      allTasksLoaded: true
    })
  ),
  on(TasksActions.storeCreatedTaskAction,
    (currentState, action) =>
    tasksEntityAdapter.addOne(action.createdTask, currentState)
  ),
  on(TasksActions.updateTaskAction,
    (currentState, action) =>
    tasksEntityAdapter.updateOne(action.updatedTask, currentState)
  ),
  on(TasksActions.deleteTaskAction, (currentState, action) =>
    tasksEntityAdapter.removeOne(action.taskId, currentState)
  )
  /*on(removeAllTasksAction, (tasksState) =>
    tasksEntityAdapter.removeAll({
      ...tasksState,
      allTasksLoaded: false
    })
  )*/
);

export const {selectAll} = tasksEntityAdapter.getSelectors();
