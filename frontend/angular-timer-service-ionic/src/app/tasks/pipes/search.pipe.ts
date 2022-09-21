import { Pipe, PipeTransform } from '@angular/core';
import { Task } from "../model/task";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  private numberRegex = /^[0-9]*$/;

  transform(arrayValues: Task[], textToSearch: string = '', column: string = 'name'): Task[] {
    if (textToSearch === '') {
      return arrayValues;
    }
    if (!arrayValues) {
      return arrayValues;
    }
    let result: Task[] = [];
    switch (column) {
      case 'name':
        result = arrayValues.filter(task =>
          task.name.toLowerCase().includes(textToSearch.toLowerCase())
        );
        break;
      case 'day':
        result = arrayValues.filter(task =>
          task.daysOfWeek.filter(day =>
            day.toLowerCase().startsWith(textToSearch.charAt(0))).length > 0
        );
        break;
      case 'hour':
        if (!this.numberRegex.test(textToSearch)) {
          alert('Please provide a valid Hour number.');
          return arrayValues;
        }
        result = arrayValues.filter(task =>
          task.hour === parseInt(textToSearch, 10)
        );
        break;
    }
    return result;
  }

}
