import { DuraformProcessPressingDto } from './../DuraformProcess/DuraformProcessPressingDto';
import { MachineDto } from './MachineDto';

export class MachinePresserDto extends MachineDto {
  duraformProcessPressings: DuraformProcessPressingDto[];
}
