import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minute'
})
export class MinutePipe implements PipeTransform {

  transform(minute: number): string {
    if (minute === 0) {
      return '00';
    }
    if (minute < 10) {
      return '0'.concat(minute.toString());
    }
    return minute.toString();
  }

}
