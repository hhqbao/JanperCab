import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(value: number): string {
    const mb = value / 1000000;

    if (mb > 1) {
      return `${mb.toFixed(2)} MB`;
    }

    if (mb < 1) {
      const kb = value / 1000;

      if (kb > 1) {
        return `${kb.toFixed(2)} KB`;
      } else {
        return `${value} B`;
      }
    }
  }
}
