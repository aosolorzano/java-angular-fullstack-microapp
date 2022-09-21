import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {finalize, first, tap} from 'rxjs/operators';
import {AppState} from "../../shared/reactive/reducers";
import {findAllTasksAction} from "./tasks.actions";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {areTasksLoaded} from "./tasks.selectors";

@Injectable()
export class TasksResolver implements Resolve<any> {

  private logger = new Logger('TasksResolver', LOG_TYPE.DEBUG);
  private loading = false;

  constructor(private store: Store<AppState>) {}

  // Triggered when the Tasks route is activated.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.logger.debug('resolve() - START: ', route.url);
    return this.store
      .pipe(
        select(areTasksLoaded),
        tap((tasksLoaded: boolean) => {
          this.logger.debug('resolve() - areTasksLoaded(): ', tasksLoaded);
          this.logger.debug('resolve() - this.loading: ', this.loading);
          if (!this.loading && !tasksLoaded) {
            this.loading = true;
            this.logger.debug('resolve(): Dispatching LOAD_ALL_TASKS action...');
            this.store.dispatch(findAllTasksAction());
          }
        }),
        filter(tasksLoaded => tasksLoaded),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
