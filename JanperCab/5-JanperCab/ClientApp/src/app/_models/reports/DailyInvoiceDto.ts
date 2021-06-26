import { Type } from 'class-transformer';

export class DailyInvoiceDto {
  invoiceId: number;
  enquiryId: number;
  customerName: string;
  orderReference: string;
  type: string;
  hasFixedPrice: boolean;
  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  @Type(() => Date)
  createdDate: Date;
}
