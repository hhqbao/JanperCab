import { Type } from 'class-transformer';
import { InvoiceComponentDto } from './InvoiceComponentDto';
export class InvoiceDto {
  id: string;
  enquiryId: number;
  createdDate: Date;

  cabinetMakerId: number;
  distributorId: number;
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
