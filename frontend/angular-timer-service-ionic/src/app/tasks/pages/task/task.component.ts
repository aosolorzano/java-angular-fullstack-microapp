import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../model/task";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {TasksService} from "../../services/tasks.service";
import {ZonedDate} from "../../utils/dates/zoned.date";
import {ButtonsState} from "../../utils/common/buttons.state";
import {TasksPagesEnum} from "../../utils/routes/tasks-pages.enum";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends ButtonsState implements OnInit {

  public taskForm: FormGroup = this.formBuilder.group({
    name:          [null, [Validators.required,                 Validators.minLength(5), Validators.maxLength(25)]],
    description:   [null, [Validators.minLength(10), Validators.maxLength(150)]],
    hour:          [null, [Validators.required,                 Validators.min(0), Validators.max(23)]],
    minute:        [null, [Validators.required,                 Validators.min(0), Validators.max(59)]],
    executionTime: [null, Validators.required],
    daysOfWeek:    [null, Validators.required],
    executeUntil:  [null, Validators.required]
  });
  public executionTimeValue = '';
  public executeUntilValue = '';
  public taskPageTitle: string;
  public task: Task;

  private taskId: string;
  private logger = new Logger('TaskPage', LOG_TYPE.DEBUG);

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              public toastController: ToastController, private taskService: TasksService) {
    super();
  }

  public async ngOnInit() {
    this.logger.debug('ngOnInit() - START: ', this.router.url);
    if(this.router.url.endsWith('create')) {
      this.taskPageTitle = 'Create Task';
      super.setCreateButtonsState();
    } else {
      this.taskId = this.route.snapshot.paramMap.get('taskId');
      this.logger.debug('ngOnInit() - TaskId: ', this.taskId);
      if (this.taskId) {
        this.taskService.getById(this.taskId).subscribe(task => {
          this.task = task;
          this.initTaskDates();
          this.taskForm.patchValue(this.task);
          if (this.router.url.includes('update')) {
            this.taskPageTitle = 'Update Task';
            super.setUpdateButtonsState();
          } else if (this.router.url.includes('details')) {
            this.taskPageTitle = 'Task Details';
            this.taskForm.disable();
            super.setDetailsButtonsState();
          }
        });
      } else {
        await this.router.navigate([TasksPagesEnum.homePage]);
        await this.presentToast('Task not found.');
      }
    }
    this.logger.debug('ngOnInit() - END');
  }

  public formatExecuteUntilDate(value: string): string {
    this.taskForm.patchValue({
      executeUntil: ZonedDate.getParsedZonedDate(value)
    });
    return ZonedDate.getParsedZonedDate(value, 'dd MMM yyyy');
  }

  public formatExecutionTime(value: string): string {
    const formattedTime: string = ZonedDate.getParsedZonedDate(value, 'HH:mm');
    const taskTimeValues: string[] = formattedTime.split(':');
    this.taskForm.patchValue({
      hour: taskTimeValues[0]
    });
    this.taskForm.patchValue({
      minute: taskTimeValues[1]
    });
    this.taskForm.patchValue({
      executionTime: value,
    });
    return formattedTime;
  }

  public resetForm(): void {
    if (super.isCreatingState()) {
      this.executionTimeValue = '';
      this.executeUntilValue = '';
      this.taskForm.reset();
    } else if (super.isUpdatingState()) {
      this.taskForm.patchValue(this.task);
      this.initTaskDates();
    }
  }

  public async save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    if (super.isCreatingState()) {
      const task: Task = this.getNewTaskFromForm();
      this.taskService.create(task).subscribe(async createdTask => {
        await this.router.navigate([TasksPagesEnum.updateTaskPage, createdTask.id]);
        await this.presentToast('Task created successfully.');
      });
    } else if (super.isUpdatingState()) {
      const task: Task = this.getUpdatedTaskFromForm();
      this.taskService.update(task).subscribe(() => {
        this.task = task;
        this.presentToast('Task updated successfully.');
      });
    }
  }

  private initTaskDates() {
    const executionTime: Date = new Date(1985, 4, 8, this.task.hour, this.task.minute, 0, 0);
    this.executionTimeValue = this.formatExecutionTime(ZonedDate.getStringZonedDate(executionTime));
    this.executeUntilValue = this.formatExecuteUntilDate(this.task.executeUntil);
  }

  private getNewTaskFromForm(): Task {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;
    const task: Task = formValues;
    task.executionCommand = "python3 /home/pi/faker/faker.py";
    task.executeUntil = ZonedDate.getStringZonedDate(ZonedDate
      .setTimeToMidnight(new Date(task.executeUntil)));
    return task;
  }

  private getUpdatedTaskFromForm(): Task {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;
    const task: Task = formValues;
    task.id = this.task.id;
    task.executionCommand = this.task.executionCommand;
    task.executeUntil = ZonedDate.getStringZonedDate(ZonedDate
      .setTimeToMidnight(new Date(task.executeUntil)));
    task.createdAt = this.task.createdAt;
    return task;
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }

}
