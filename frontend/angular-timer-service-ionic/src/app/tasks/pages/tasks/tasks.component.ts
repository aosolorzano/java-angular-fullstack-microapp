import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {Logger} from "aws-amplify";
import {LOG_TYPE} from "@aws-amplify/core/lib-esm/Logger";
import {Router} from "@angular/router";
import {AlertController, PopoverController, ToastController} from "@ionic/angular";
import {TasksService} from "../../services/tasks.service";
import {SearchComponent} from "../../components/search/search.component";
import {AppRoutesEnum} from "../../../shared/utils/enums/app.routes.enum";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  public searchField: string = 'name';
  public searchInputMode: string = 'text';
  public searchText: string;
  public tasks: Task[] = null;
  private logger = new Logger('TasksComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private alertController: AlertController,
              public toastController: ToastController,
              public popoverController: PopoverController,
              private taskService: TasksService) {
  }

  public ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
    this.logger.debug('ngOnInit() - END');
  }

  public async presentSearchOptionsPopover(event: any) {
    const popover = await this.popoverController.create({
      component: SearchComponent,
      animated: true,
      mode: 'md',
      event: event,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();
    const {data} = await popover.onWillDismiss();
    if (data) {
      this.searchField = data.optionSelected;
      if (this.searchField === 'hour') {
        this.searchInputMode = 'numeric';
      } else {
        this.searchInputMode = 'text';
      }
    }
  }

  public onSearchTextChange(event: any) {
    this.searchText = event.target.value;
    this.logger.debug('onSearchTextChange(): ' + this.searchText);
  }

  public async create() {
    await this.router.navigateByUrl(AppRoutesEnum.createTaskPage);
  }

  public async update(task: Task) {
    await this.router.navigate([AppRoutesEnum.updateTaskPage, task.id]);
  }

  public async details(task: Task) {
    await this.router.navigate([AppRoutesEnum.detailsTaskPage, task.id]);
  }

  public async presentDeleteTaskAlert(task: Task) {
    this.logger.debug('presentDeleteTaskAlert() - START: ' + task.id);
    const alert = await this.alertController.create({
      header: 'Delete Task',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Are you sure you want to delete this task and its corresponding timer job?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.logger.debug('Cancel task deletion.');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.delete(task);
          }
        }]
    });
    await alert.present();
  }

  private async delete(task: Task) {
    this.logger.debug('delete() - START: ' + task.id);
    this.taskService.delete(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(actualTask => actualTask.id !== task.id);
    });
    await this.presentToast();
    this.logger.debug('delete() - END');
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'Task deleted successfully.',
      duration: 2000
    });
    await toast.present();
  }

}
