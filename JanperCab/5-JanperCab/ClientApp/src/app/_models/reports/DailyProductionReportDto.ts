import { ProcessTypeEnum } from './../../_enums/ProcessTypeEnum';
export class DailyProductionReportDto {
  enquiryId: number;
  createdDate: Date;
  type: string;
  door: string;
  colour: string;
  partCount: number;
  customerName: string;
  customerReference: string;
  status: ProcessTypeEnum;
  daysInSystem: number;
}
