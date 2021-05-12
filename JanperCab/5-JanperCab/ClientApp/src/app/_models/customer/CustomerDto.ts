import { CustomerType } from './../../_enums/CustomerType';

export abstract class CustomerDto {
  $type: string;
  id: number;
  managerId: number;
  customerType: CustomerType;
  name: string;
  imageUrl: string;
  email: string;
  phone: string;
  fax: string;
  note: string;

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

  discountRate: number;

  get invoiceDetails(): string {
    return `${this.invoiceAddress}, ${this.invoiceSuburb} ${this.invoiceState} ${this.invoicePostcode}`;
  }

  get deliveryDetails(): string {
    return `${this.deliveryAddress}, ${this.deliverySuburb} ${this.deliveryState} ${this.deliveryPostcode}`;
  }

  constructor() {}
}
