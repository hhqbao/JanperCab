import { MachineCleaningDto } from './../machine/MachineCleaningDto';
import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessCleaningDto extends DuraformProcessDto {
  machineId: number;

  machineCleaning: MachineCleaningDto;

  getStatus(): string {
    let status = this.startTime && this.endTime ? 'Cleaned' : 'Cleaning';

    if (this.machineCleaning) {
      status += ` - ${this.machineCleaning.name}`;
    }

    return status;
  }
}
