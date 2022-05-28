import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  public taskId: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
