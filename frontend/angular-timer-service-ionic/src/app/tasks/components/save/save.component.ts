import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {Task} from "../../model/task";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTaskById} from "../../reactive/tasks.selectors";
import {TasksPagesEnum} from "../../utils/routes/tasks-pages.enum";
import {ZonedDateUtil} from "../../utils/dates/zoned.date";
import {createTaskAction, updateTaskAction} from "../../reactive/tasks.actions";
import {Update} from "@ngrx/entity";
import {ButtonsState} from "../../../shared/utils/buttons/buttons.state";
import {AppState} from "../../../shared/reactive/reducers/app.reducer";

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss'],
})
export class SaveComponent extends ButtonsState implements OnInit {

  public taskForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    description: [null, [Validators.minLength(10), Validators.maxLength(150)]],
    hour: [null, [Validators.required, Validators.min(0), Validators.max(23)]],
    minute: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
    executionTime: [null, Validators.required],
    daysOfWeek: [null, Validators.required],
    executeUntil: [null, Validators.required]
  });
  public executionTimeText = '';
  public executeUntilText = '';
  public taskPageTitle: string;

  private logger = new Logger('SaveComponent', LOG_TYPE.DEBUG);
  private task: Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private store: Store<AppState>) {
    super();
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    if (this.router.url.endsWith('create')) {
      this.taskPageTitle = 'Create Task';
      super.setCreateButtonsState();
    } else {
      this.taskPageTitle = 'Update Task';
      const taskId = this.route.snapshot.paramMap.get('taskId');
      if (taskId) {
        const task$: Observable<Task> = this.store.pipe(select(selectTaskById(taskId)));
        task$.subscribe(task => {
          if (task) {
            this.task = task;
            this.assignTaskValuesToForm(task);
          }
        });
      } else {
        await this.router.navigate([TasksPagesEnum.homePage]);
        await this.presentToast('Task ID not found.');
      }
    }
    this.logger.debug('ngOnInit() - END');
  }

  public formatExecuteUntilDate(value: string): string {
    this.logger.debug('formatExecuteUntilDate() - value: ', value);
    const formattedDate: string = ZonedDateUtil.getParsedZonedDate(value, 'dd MMM yyyy');
    this.taskForm.patchValue({
      executeUntil: formattedDate
    });
    return formattedDate;
  }

  public async save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    if (super.isCreatingState()) {
      this.createTask();
      await this.presentToast('Task created successfully.');
    } else if (super.isUpdatingState()) {
      this.updateTask();
      await this.presentToast('Task updated successfully.');
    }
    await this.router.navigateByUrl(TasksPagesEnum.homePage);
  }

  public async cancel(): Promise<void> {
    if (super.isCreatingState()) {
      this.executionTimeText = '';
      this.executeUntilText = '';
      this.taskForm.reset();
    } else if (super.isUpdatingState()) {
      this.taskForm.patchValue(this.task);
      this.initTaskDates(this.task);
    }
    await this.router.navigateByUrl(TasksPagesEnum.homePage);
  }

  private assignTaskValuesToForm(task: Task) {
    this.taskForm.patchValue(task);
    this.initTaskDates(task);
    super.setUpdateButtonsState();
  }

  private initTaskDates(task: Task) {
    const executionTime: Date = new Date(1985, 4, 8, task.hour, task.minute, 0, 0);
    this.executionTimeText = this.formatExecutionTime(ZonedDateUtil.getStringZonedDate(executionTime));
    this.executeUntilText = this.formatExecuteUntilDate(task.executeUntil);
  }

  public formatExecutionTime(value: string): string {
    const formattedTime: string = ZonedDateUtil.getParsedZonedDate(value, 'HH:mm');
    const taskTimeValues: string[] = formattedTime.split(':');
    this.taskForm.patchValue({
      hour: taskTimeValues[0]
    });
    this.taskForm.patchValue({
      minute: taskTimeValues[1]
    });
    this.taskForm.patchValue({
      executionTime: formattedTime,
    });
    return formattedTime;
  }

  private createTask() {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;  // field not needed in the Task model.
    let newTask: Task = formValues;
    newTask.executionCommand = "python3 /home/pi/faker/faker.py";
    newTask.executeUntil = ZonedDateUtil.getStringZonedDate(
      ZonedDateUtil.setTimeToMidnight(new Date(newTask.executeUntil)));
    this.store.dispatch(createTaskAction({newTask}));
  }

  private updateTask() {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;
    let formTask: Task = formValues;
    formTask.id = this.task.id;
    formTask.executionCommand = this.task.executionCommand;
    formTask.executeUntil = ZonedDateUtil.getStringZonedDate(
      ZonedDateUtil.setTimeToMidnight(new Date(formTask.executeUntil)));
    formTask.createdAt = this.task.createdAt;
    const updatedTask: Update<Task> = {
      id: this.task.id,
      changes: formTask
    };
    this.store.dispatch(updateTaskAction({updatedTask}));
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

}
