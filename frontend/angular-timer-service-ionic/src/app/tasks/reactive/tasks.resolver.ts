import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {finalize, first, tap} from 'rxjs/operators';
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {areTasksLoaded} from "./tasks.selectors";
import {TasksActions} from "./action.types";
import {AppState} from "../../shared/reactive/reducers/app.reducer";

@Injectable()
export class TasksResolver implements Resolve<any> {

  private loading = false;
  private logger = new Logger('TasksResolver', LOG_TYPE.DEBUG);

  constructor(private store: Store<AppState>) {}

  // Triggered when the Tasks route is activated.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.logger.debug('resolve() - START');
    return this.store
      .pipe(
        select(areTasksLoaded),
        tap((areTasksLoadedResponse: boolean) => {
          this.logger.debug('resolve() - areTasksLoaded: ', areTasksLoadedResponse);
          if (!this.loading && !areTasksLoadedResponse) {
            this.loading = true;
            this.logger.debug('resolve(): Dispatching findAllTasksAction() to load the tasks.');
            this.store.dispatch(TasksActions.findAllTasksAction());
          }
        }),
        filter(selectorResponse => selectorResponse),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
