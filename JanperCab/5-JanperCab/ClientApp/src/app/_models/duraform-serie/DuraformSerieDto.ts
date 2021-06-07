import { DuraformSerieTypeEnum } from 'src/app/_enums/DuraformSerieTypeEnum';

export class DuraformSerieDto {
  id: number;
  name: string;
  serieTypeEnum: DuraformSerieTypeEnum;
  isHidden: boolean;
}
