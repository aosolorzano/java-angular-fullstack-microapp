import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  public searchOptions = [
    {title: 'Name', action: 'name'},
    {title: 'Day',  action: 'day'},
    {title: 'Hour', action: 'hour'}
  ];

  constructor(private popoverController: PopoverController) {}

  public async onSelectOption(option: string) {
    await this.popoverController.dismiss({
      optionSelected: option
    });
  }

}
