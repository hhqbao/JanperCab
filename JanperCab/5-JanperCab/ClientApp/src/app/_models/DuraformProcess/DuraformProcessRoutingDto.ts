import { MachineRouterDto } from './../machine/MachineRouterDto';
import { DuraformProcessDto } from './DuraformProcessDto';

export class DuraformProcessRoutingDto extends DuraformProcessDto {
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
