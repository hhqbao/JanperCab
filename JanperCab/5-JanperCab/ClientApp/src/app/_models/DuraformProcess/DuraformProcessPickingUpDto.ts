import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPickingUpDto extends DuraformProcessDto {
  getStatus(): string {
    if (this.startTime && this.endTime) {
      return 'Picked Up';
    }

    return 'Picking Up';
  }
}
