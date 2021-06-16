import { MachinePackingDto } from '../machine/MachinePackingDto';
import { ProcessDto } from './ProcessDto';

export class ProcessPackingDto extends ProcessDto {
  machineId: number;

  machinePacking: MachinePackingDto;

  getStatus(): string {
    let status = this.startTime && this.endTime ? 'Packed' : 'Packing';

    if (this.machinePacking) {
      status += ` - ${this.machinePacking.name}`;
    }

    return status;
  }
}
