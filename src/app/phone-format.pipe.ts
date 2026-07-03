import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: number | null, format: string): string {
    if(!value) return ''; 
    let phoneNumberToString: string = value.toString();
    phoneNumberToString = phoneNumberToString.replace(/[^\d+]/g, '');
    const numberWithPlus: string = '+' + phoneNumberToString;
    const countryCode: string = '+' + phoneNumberToString.slice(0, phoneNumberToString.length - 10);
    const mainNumber: string = phoneNumberToString.slice(phoneNumberToString.length - 10);
    const operator: string = mainNumber.slice(0, 3);
    const part1: string = mainNumber.slice(3, 6);
    const part2: string = mainNumber.slice(6, 8);
    const part3: string = mainNumber.slice(8, 10);
    if(format === 'compact') {
      return numberWithPlus;
    }
    if(format === 'international') {
      return `${countryCode} ${operator} ${part1} ${part2} ${part3}`
    }
    if(format === 'national') {
      return `${operator} ${part1} ${part2} ${part3}`
    }
    if(format === 'masked') {
      return `${countryCode} ${operator} *** ** ${part3}`
    }
    return numberWithPlus;
  }

}
