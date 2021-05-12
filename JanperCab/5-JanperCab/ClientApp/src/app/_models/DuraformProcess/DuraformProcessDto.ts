import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import * as moment from 'moment';
import { ProcessDto } from './ProcessDto';

export abstract class DuraformProcessDto extends ProcessDto {
  duraformProcessType: DuraformProcessEnum;

  abstract getStatus(): string;

  getDuration(): string {
    if (this.startTime && this.endTime) {
      let offsetInMilSeconds = moment(this.endTime).diff(
        moment(this.startTime)
      );

      const days = Math.floor(offsetInMilSeconds / 86400000);
      offsetInMilSeconds -= days * 86400000;
      const hours = Math.floor(offsetInMilSeconds / 3600000);
      offsetInMilSeconds -= hours * 3600000;
      const minutes = Math.floor(offsetInMilSeconds / 60000);
      offsetInMilSeconds -= minutes * 60000;
      const seconds = Math.floor(offsetInMilSeconds / 1000);

      return `${days > 0 ? days + ' days ' : ''}${('0' + hours).slice(-2)}:${(
        '0' + minutes
      ).slice(-2)}:${('0' + seconds).slice(-2)}`;
    }

    return null;
  }
}
