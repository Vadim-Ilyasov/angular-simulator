import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | undefined, items: string[]): string {
    if (value === undefined) return '';
    let index = 2;
    if (value % 100 >= 11 && value % 100 <= 14) {
      index = 2;
    } else {
      const anotherValue = value % 10;
      if (anotherValue >= 2 && anotherValue <= 4) {
        index = 1;
      }
      if (anotherValue === 1) {
        index = 0;
      }
    }
    return `${value} ${items[index]}`;
  }

}
