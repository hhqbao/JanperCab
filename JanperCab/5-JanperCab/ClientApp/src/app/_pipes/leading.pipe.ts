import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leading',
})
export class LeadingPipe implements PipeTransform {
  transform(value: number, format: string): string {
    const valueString = value + '';

    const subFormat = format.split('');
    subFormat.splice(0, valueString.length);

    return subFormat.join('') + valueString;
  }
}
