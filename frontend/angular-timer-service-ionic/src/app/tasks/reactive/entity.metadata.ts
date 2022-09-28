import {EntityMetadataMap} from '@ngrx/data';
import {compareTasks} from "../model/task";

export const entityMetadata: EntityMetadataMap = {
  Task: {
    sortComparer: compareTasks,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticDelete: false
    }
  }
};
