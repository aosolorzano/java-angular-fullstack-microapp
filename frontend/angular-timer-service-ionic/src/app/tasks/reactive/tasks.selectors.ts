import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TasksState} from './reducers/tasks.reducers';
import * as tasksAdapterSelectors from './reducers/tasks.reducers';
import {TasksStoreKeyEnum} from "../utils/common/store-keys.enum";

export const tasksFeatureSelector = createFeatureSelector<TasksState>(TasksStoreKeyEnum.tasksFeatureName);

export const selectAllEntityTasks = createSelector(
  tasksFeatureSelector,
  tasksAdapterSelectors.selectAll
);

export const areTasksLoaded = createSelector(
  tasksFeatureSelector,
  tasksState => tasksState.allTasksLoaded
);
