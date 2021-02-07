import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySum',
})
export class ArraySumPipe implements PipeTransform {
  transform(value: any[], property: string): number {
    let returnValue = 0;

    value.forEach((x) => (returnValue += x[property] ? x[property] : 0));

    return returnValue;
  }
}
