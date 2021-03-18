import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessCleaningDto extends DuraformProcessDto {
  getStatus(): string {
    if (this.startTime && this.endTime) {
      return 'Cleaned';
    }

    return 'Cleaning';
  }
}
