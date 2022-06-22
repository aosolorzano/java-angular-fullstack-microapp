import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() pageTitle: string | '';
  @Input() showBackButton: boolean | false;

  constructor() {
    //Nothing to implement.
  }

}
