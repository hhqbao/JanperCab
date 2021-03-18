import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPackingDto extends DuraformProcessDto {
  getStatus(): string {
    if (this.startTime && this.endTime) {
      return 'Packed';
    }

    return 'Packing';
  }
}
