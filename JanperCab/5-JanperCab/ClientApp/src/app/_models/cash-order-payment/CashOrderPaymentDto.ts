import { Type } from 'class-transformer';

export class CashOrderPaymentDto {
  id: number;

  @Type(() => Date)
  createdDate: Date;

  enquiryId: number;
  amount: number;
}
