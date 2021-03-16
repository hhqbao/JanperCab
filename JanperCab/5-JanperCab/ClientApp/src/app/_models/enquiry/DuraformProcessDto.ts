import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';

export class DuraformProcessDto {
  id: number;
  duraformEnquiryId: number;
  process: DuraformProcessEnum;
  completedDate: Date;
}
