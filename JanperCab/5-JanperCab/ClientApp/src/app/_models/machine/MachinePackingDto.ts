import { DuraformProcessPackingDto } from './../DuraformProcess/DuraformProcessPackingDto';
import { MachineDto } from './MachineDto';

export class MachinePackingDto extends MachineDto {
  duraformProcessPackings: DuraformProcessPackingDto[];
}
