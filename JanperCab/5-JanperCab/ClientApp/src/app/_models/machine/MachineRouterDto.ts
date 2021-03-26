import { DuraformProcessRoutingDto } from './../DuraformProcess/DuraformProcessRoutingDto';
import { MachineDto } from './MachineDto';

export class MachineRouterDto extends MachineDto {
  duraformProcessRoutings: DuraformProcessRoutingDto[];
}
