import { MachinePackingDto } from '../machine/MachinePackingDto';
import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPackingDto extends DuraformProcessDto {
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
