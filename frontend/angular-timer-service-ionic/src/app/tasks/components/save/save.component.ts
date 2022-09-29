import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {Task} from "../../model/task";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {TasksPagesEnum} from "../../utils/routes/tasks-pages.enum";
import {ZonedDateUtil} from "../../utils/dates/zoned.date";
import {ButtonsState} from "../../../shared/utils/buttons/buttons.state";
import {TasksEntityService} from "../../services/tasks-entity.service";

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveComponent extends ButtonsState implements OnInit {

  public taskForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    description: [null, [Validators.minLength(10), Validators.maxLength(150)]],
    hour: [null, [Validators.required, Validators.min(0), Validators.max(23)]],
    minute: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
    executionTime: [null, Validators.required],
    executionDays: [null, Validators.required],
    executeUntil: [null, Validators.required]
  });
  public executionTimeText = '';
  public executeUntilText = '';
  public taskPageTitle: string;

  private logger = new Logger('SaveComponent', LOG_TYPE.DEBUG);
  private originalTask: Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private taskEntityService: TasksEntityService) {
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
      this.taskEntityService.getByKey(taskId).subscribe(async task => {
        if (task) {
          this.originalTask = task;
          this.assignTaskValuesToForm(this.originalTask);
        } else {
          await this.presentToast(`Task <b>${taskId}</b> not found.`);
          await this.router.navigate([TasksPagesEnum.homePage]);
        }
      });
    }
    this.logger.debug('ngOnInit() - END');
  }

  public formatExecuteUntilDate(value) {
    this.logger.debug('formatExecuteUntilDate() - value: ', value);
    const formattedDate: string = ZonedDateUtil.getParsedZonedDate(value, 'dd MMM yyyy');
    this.taskForm.patchValue({
      executeUntil: formattedDate
    });
    return formattedDate;
  }

  public formatExecutionTime(value) {
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

  public async save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    if (super.isCreatingState()) {
      this.createTask();
    } else if (super.isUpdatingState()) {
      this.updateTask();
    }
    await this.router.navigateByUrl(TasksPagesEnum.homePage);
  }

  public async cancel(): Promise<void> {
    if (super.isCreatingState()) {
      this.executionTimeText = '';
      this.executeUntilText = '';
      this.taskForm.reset();
    } else if (super.isUpdatingState()) {
      this.taskForm.patchValue(this.originalTask);
      this.initTaskDates(this.originalTask);
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

  private createTask() {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;
    const newTask: Task = formValues;
    newTask.executionCommand = "python3 /home/pi/faker/faker.py";
    newTask.executeUntil = ZonedDateUtil.getStringZonedDate(ZonedDateUtil.setTimeToMidnight(new Date(newTask.executeUntil)));
    this.taskEntityService.add(newTask).subscribe(async (createdTask: Task) => {
      this.logger.debug('createTask() - Task created successfully: ', createdTask);
      await this.presentToast('Task created successfully.');
    });
  }

  private updateTask() {
    const formValues = {...this.taskForm.value};
    delete formValues.executionTime;
    const updatedTask: Task = formValues;
    updatedTask.id = this.originalTask.id;
    updatedTask.executionCommand = this.originalTask.executionCommand;
    updatedTask.executeUntil = ZonedDateUtil.getStringZonedDate(ZonedDateUtil.setTimeToMidnight(new Date(updatedTask.executeUntil)));
    updatedTask.createdAt = this.originalTask.createdAt;
    this.taskEntityService.update(updatedTask).subscribe(async (taskUpdated: Task) => {
      this.logger.debug('updateTask() - Task updated successfully: ', taskUpdated);
      await this.presentToast('Task updated successfully.');
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

}
