import { CustomerLevel } from './../../_enums/CustomerLevel';
export class CustomerDto {
  id: number;
  customerLevel: CustomerLevel;
  name: string;
  imageUrl: string;

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
}
