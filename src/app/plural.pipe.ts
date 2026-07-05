import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | undefined, items: string[]): string {
    if (value === undefined) { 
      return '';
    }
    let index = 2;
    const twoDigitsModulo = 100;
    const lastDigit = value % 10;
    if (value % twoDigitsModulo >= 11 && value % twoDigitsModulo <= 14) {
      index = 2;
    } else {
      if (lastDigit >= 2 && lastDigit <= 4) {
        index = 1;
      }
      if (lastDigit === 1) {
        index = 0;
      }
    }
    return `${value} ${items[index]}`;
  }

}
