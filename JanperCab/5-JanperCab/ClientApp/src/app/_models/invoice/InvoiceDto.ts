import { Type } from 'class-transformer';
import { InvoiceComponentDto } from './InvoiceComponentDto';
export class InvoiceDto {
  id: string;
  enquiryId: number;
  createdDate: Date;
  gstRate: number;
  discountRate: number;
  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  @Type(() => InvoiceComponentDto)
  invoiceComponents: InvoiceComponentDto[];
}
