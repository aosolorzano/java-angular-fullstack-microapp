import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public create(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public update(task: Task): Observable<any> {
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  public getById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }
}
