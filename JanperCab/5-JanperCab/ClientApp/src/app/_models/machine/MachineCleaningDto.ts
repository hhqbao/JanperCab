import { ProcessCleaningDto } from '../process/ProcessCleaningDto';
import { MachineDto } from './MachineDto';

export class MachineCleaningDto extends MachineDto {
  duraformProcessCleanings: ProcessCleaningDto[];
}
