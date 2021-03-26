import { MachineTypeEnum } from 'src/app/_enums/MachineTypeEnum';
import { MachineProdutionCurrentProcessDto } from './MachineProdutionCurrentProcessDto';

export class MachineProductionListDto {
  id: number;
  machineType: MachineTypeEnum;
  name: string;
  currentProcesses: MachineProdutionCurrentProcessDto[];
}
