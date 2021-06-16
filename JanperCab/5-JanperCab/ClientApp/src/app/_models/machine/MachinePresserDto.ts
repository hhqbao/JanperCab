import { ProcessPressingDto } from '../process/ProcessPressingDto';
import { MachineDto } from './MachineDto';

export class MachinePresserDto extends MachineDto {
  duraformProcessPressings: ProcessPressingDto[];
}
