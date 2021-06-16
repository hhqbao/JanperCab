import { ProcessRoutingDto } from '../process/ProcessRoutingDto';
import { MachineDto } from './MachineDto';

export class MachineRouterDto extends MachineDto {
  duraformProcessRoutings: ProcessRoutingDto[];
}
