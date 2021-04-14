import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leading',
})
export class LeadingPipe implements PipeTransform {
  transform(value: number, format: string = null): string {
    const valueString = value + '';

    if (!format) {
      format = '000000';
    }

    const subFormat = format.split('');
    subFormat.splice(0, valueString.length);

    return subFormat.join('') + valueString;
  }
}
