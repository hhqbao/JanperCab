import { Type } from 'class-transformer';

export class OnHoldComponentDto {
  id: number;
  processId: number;

  @Type(() => Date)
  createdDate: Date;

  quantity: number;
  description: string;
}
