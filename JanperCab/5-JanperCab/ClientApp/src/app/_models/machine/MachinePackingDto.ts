import { ProcessPackingDto } from '../process/ProcessPackingDto';
import { MachineDto } from './MachineDto';

export class MachinePackingDto extends MachineDto {
  duraformProcessPackings: ProcessPackingDto[];
}
