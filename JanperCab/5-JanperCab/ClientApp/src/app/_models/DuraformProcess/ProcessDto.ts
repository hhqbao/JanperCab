import { OnHoldComponentDto } from './../on-hold-detail/OnHoldComponentDto';
import { Type } from 'class-transformer';

export abstract class ProcessDto {
  $type: string;
  id: number;
  enquiryId: number;
  startTime: Date;
  endTime: Date;
  isCurrent: boolean;

  @Type(() => OnHoldComponentDto)
  onHoldComponents: OnHoldComponentDto[];
}
