import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysOfWeek'
})
export class DaysPipe implements PipeTransform {

  private sortedDays = {
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thu": 4,
    "Fri": 5,
    "Sat": 6,
    "Sun": 7
  };

  transform(dayList: Array<string>): Array<string> {
    if (!dayList || dayList.length === 0) {
      return [];
    }
    const newDayList = [];
    if (dayList.length == 7) {
      newDayList.push('Everyday');
      return newDayList;
    }
    dayList.forEach((value, i) => {
      switch (value) {
        case 'MON':
          newDayList.push('Mon');
          break;
        case 'TUE':
          newDayList.push('Tue');
          break;
        case 'WED':
          newDayList.push('Wed');
          break;
        case 'THU':
          newDayList.push('Thu');
          break;
        case 'FRI':
          newDayList.push('Fri');
          break;
        case 'SAT':
          newDayList.push('Sat');
          break;
        case 'SUN':
          newDayList.push('Sun');
          break;
      };
    });
    newDayList.sort((a, b) => {
      return this.sortedDays[a] - this.sortedDays[b];
    });
    return newDayList;
  }
}
