import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksEntityService} from "../../services/tasks-entity.service";
import {TasksPagesEnum} from "../../utils/routes/tasks-pages.enum";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public task: Task = {
    id: '',
    name: '',
    description: '',
    hour: 0,
    minute: 0,
    executeUntil: '',
    executionDays: [],
    executionCommand: "",
    createdAt: null,
    updatedAt: null
  };
  public taskPageTitle = 'Task Details';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastController: ToastController,
              private taskEntityService: TasksEntityService) { }

  public async ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    this.taskEntityService.getByKey(taskId).subscribe(async task => {
      if (task) {
        this.task = task;
      } else {
        await this.presentToast(`Task <b>${taskId}</b> not found.`);
        await this.router.navigate([TasksPagesEnum.homePage]);
      }
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  public async return() {
    await this.router.navigate([TasksPagesEnum.homePage]);
  }
}
