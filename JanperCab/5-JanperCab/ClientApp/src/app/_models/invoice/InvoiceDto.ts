import { Type } from 'class-transformer';
import { InvoiceComponentDto } from './InvoiceComponentDto';
export class InvoiceDto {
  id: number;
  enquiryId: number;
  createdDate: Date;

  customerId: number;
  customerReference: string;

  doorType: string;
  doorColor: string;

  invoiceTo: string;
  invoiceAddress: string;
  invoiceSuburb: string;
  invoiceState: string;
  invoicePostcode: string;

  deliveryTo: string;
  deliveryAddress: string;
  deliverySuburb: string;
  deliveryState: string;
  deliveryPostcode: string;

  gstRate: number;
  discountRate: number;
  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  @Type(() => InvoiceComponentDto)
  invoiceComponents: InvoiceComponentDto[];
}
