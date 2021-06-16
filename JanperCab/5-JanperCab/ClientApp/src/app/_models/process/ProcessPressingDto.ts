import { MachinePresserDto } from '../machine/MachinePresserDto';
import { ProcessDto } from './ProcessDto';

export class ProcessPressingDto extends ProcessDto {
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
