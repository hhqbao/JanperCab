import { MachineTypeEnum } from 'src/app/_enums/MachineTypeEnum';

export abstract class MachineDto {
  id: number;
  machineType: MachineTypeEnum;
  name: string;
}
