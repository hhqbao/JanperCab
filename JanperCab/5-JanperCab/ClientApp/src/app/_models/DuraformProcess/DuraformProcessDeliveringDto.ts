import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessDeliveringDto extends DuraformProcessDto {
  getStatus(): string {
    if (this.startTime && this.endTime) {
      return 'Delivered';
    }

    return 'Delivering';
  }
}
