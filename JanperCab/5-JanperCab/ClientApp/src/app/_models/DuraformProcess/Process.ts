export abstract class ProcessDto {
  id: number;
  enquiryId: number;
  startTime: Date;
  endTime: Date;
  isCurrent: boolean;
}
