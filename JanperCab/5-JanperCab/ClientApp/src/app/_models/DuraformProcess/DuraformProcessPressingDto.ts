import { MachinePresserDto } from './../machine/MachinePresserDto';
import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessPressingDto extends DuraformProcessDto {
  machineId: number;

  machinePresser: MachinePresserDto;

  getStatus(): string {
    status = this.startTime && this.endTime ? 'Pressed' : 'Pressing';

    if (this.machinePresser) {
      status += ` - ${this.machinePresser.name}`;
    }

    return status;
  }
}
