import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(hour: number): string {
    if (hour === 0) {
      return '00';
    }
    if (hour < 10) {
      return '0'.concat(hour.toString());
    }
    return hour.toString();
  }

}
