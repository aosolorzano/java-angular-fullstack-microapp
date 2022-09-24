import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
import {map} from "rxjs/operators";

@Injectable()
export class TasksService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public create(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public update(taskId: string | number, changes: Partial<Task>): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${taskId}`, changes);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }

  public findAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`)
      .pipe(
        map(response => response['payload'])
      );
  }
}
