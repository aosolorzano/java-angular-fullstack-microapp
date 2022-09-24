import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TasksState} from './tasks.reducers';
import * as tasksReducerAdapter from './tasks.reducers';
import {TasksStoreKeyEnum} from "../utils/common/store-keys.enum";

export const tasksStateSelector = createFeatureSelector<TasksState>(TasksStoreKeyEnum.tasksFeatureName);

export const selectAllTasksLoaded = createSelector(
  tasksStateSelector,
  tasksReducerAdapter.selectAll
);

export const areTasksLoaded = createSelector(
  tasksStateSelector,
  currentState => currentState.allTasksLoaded
);

export const selectTaskById = (taskId: string) => createSelector(
  selectAllTasksLoaded,
  (tasks) => tasks.find(task => task.id === taskId)
);
