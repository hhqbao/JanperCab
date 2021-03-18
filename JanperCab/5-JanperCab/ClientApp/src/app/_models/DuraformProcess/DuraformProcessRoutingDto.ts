import { MachineDto } from '../machine/MachineDto';
import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessRoutingDto extends DuraformProcessDto {
  machineId: number;

  machine: MachineDto;

  getStatus(): string {
    status = this.startTime && this.endTime ? 'Routed' : 'Routing';

    if (this.machine) {
      status += ` - ${this.machine.name}`;
    }

    return status;
  }
}
