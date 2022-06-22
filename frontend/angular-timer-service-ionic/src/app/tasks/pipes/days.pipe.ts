import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysOfWeek'
})
export class DaysPipe implements PipeTransform {

  private sortedDays = {
    "Mo": 1,
    "Tu": 2,
    "We": 3,
    "Th": 4,
    "Fr": 5,
    "Sa": 6,
    "Su": 7
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
          newDayList.push('Mo');
          break;
        case 'TUE':
          newDayList.push('Tu');
          break;
        case 'WED':
          newDayList.push('We');
          break;
        case 'THU':
          newDayList.push('Th');
          break;
        case 'FRI':
          newDayList.push('Fr');
          break;
        case 'SAT':
          newDayList.push('Sa');
          break;
        case 'SUN':
          newDayList.push('Su');
          break;
      };
    });
    newDayList.sort((a, b) => {
      return this.sortedDays[a] - this.sortedDays[b];
    });
    return newDayList;
  }
}
