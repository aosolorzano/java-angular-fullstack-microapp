import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, first, tap} from 'rxjs/operators';
import {TasksEntityService} from "./tasks-entity.service";

@Injectable()
export class TasksResolverService implements Resolve<boolean> {

  constructor(private taskEntityService: TasksEntityService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.taskEntityService.loaded$
      .pipe(
        tap(areTasksLoaded => {
          if (!areTasksLoaded) {
            this.taskEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
