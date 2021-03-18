import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPressingDto extends DuraformProcessDto {
  getStatus(): string {
    if (this.startTime && this.endTime) {
      return 'Pressed';
    }

    return 'Pressing';
  }
}
