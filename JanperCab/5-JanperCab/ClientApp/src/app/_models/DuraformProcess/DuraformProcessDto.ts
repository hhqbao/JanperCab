import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import * as moment from 'moment';

export abstract class DuraformProcessDto {
  id: number;
  duraformEnquiryId: number;
  process: DuraformProcessEnum;
  startTime: Date;
  endTime: Date;
  isCurrent: boolean;

  abstract getStatus(): string;

  getDuration(): string {
    if (this.startTime && this.endTime) {
      const minutes = moment(this.endTime).diff(
        moment(this.startTime),
        'minutes'
      );

      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return null;
  }
}
