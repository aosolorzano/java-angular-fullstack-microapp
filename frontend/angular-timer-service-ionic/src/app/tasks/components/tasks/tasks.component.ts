import {Component, OnInit} from '@angular/core';
import {Logger} from 'aws-amplify';
import {LOG_TYPE} from '@aws-amplify/core/lib-esm/Logger';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AlertController, PopoverController, ToastController} from '@ionic/angular';
import {Task} from '../../model/task';
import {SearchComponent} from '../search/search.component';
import {TasksPagesEnum} from "../../utils/routes/tasks-pages.enum";
import {selectAllTasksLoaded} from "../../reactive/tasks.selectors";
import {TasksService} from "../../services/tasks.service";
import {deleteTaskAction} from "../../reactive/tasks.actions";
import {AppState} from "../../../shared/reactive/reducers/app.reducer";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  public searchField = 'name';
  public searchInputMode = 'text';
  public searchText: string;
  public tasks$: Observable<Task[]>;
  private logger = new Logger('TasksComponent', LOG_TYPE.DEBUG);

  constructor(private router: Router, private alertController: AlertController,
              private toastController: ToastController,
              private popoverController: PopoverController,
              private tasksService: TasksService,
              private store: Store<AppState>) {
  }

  public ngOnInit() {
    this.logger.debug('ngOnInit() - START');
    this.tasks$ = this.store.pipe(select(selectAllTasksLoaded));
    this.logger.debug('ngOnInit() - END');
  }

  public async presentSearchOptionsPopover(event: any) {
    const popover = await this.popoverController.create({
      component: SearchComponent,
      animated: true,
      mode: 'md',
      event,
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
    await this.router.navigateByUrl(TasksPagesEnum.createTaskPage);
  }

  public async update(task: Task) {
    await this.router.navigate([TasksPagesEnum.homePage, task.id]);
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
    this.store.dispatch(deleteTaskAction({taskId: task.id}));
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
