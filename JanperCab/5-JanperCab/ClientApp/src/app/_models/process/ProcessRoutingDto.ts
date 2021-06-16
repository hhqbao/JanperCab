import { MachineRouterDto } from '../machine/MachineRouterDto';
import { ProcessDto } from './ProcessDto';

export class ProcessRoutingDto extends ProcessDto {
  machineId: number;

  machineRouter: MachineRouterDto;

  getStatus(): string {
    status = this.startTime && this.endTime ? 'Routed' : 'Routing';

    if (this.machineRouter) {
      status += ` - ${this.machineRouter.name}`;
    }

    return status;
  }
}
