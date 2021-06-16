import { MachineCleaningDto } from '../machine/MachineCleaningDto';
import { ProcessDto } from './ProcessDto';

export class ProcessCleaningDto extends ProcessDto {
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
