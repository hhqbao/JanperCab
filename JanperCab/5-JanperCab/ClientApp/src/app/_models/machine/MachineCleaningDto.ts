import { DuraformProcessCleaningDto } from './../DuraformProcess/DuraformProcessCleaningDto';
import { MachineDto } from './MachineDto';

export class MachineCleaningDto extends MachineDto {
  duraformProcessCleanings: DuraformProcessCleaningDto[];
}
