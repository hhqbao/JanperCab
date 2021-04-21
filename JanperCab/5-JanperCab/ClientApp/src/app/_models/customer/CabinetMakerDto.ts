import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class CabinetMakerDto extends CustomerDto {
  distributorId: number;

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

  secondPhone: string;
  thirdPhone: string;
  discountRate: number;

  constructor() {
    super();
    this.customerType = CustomerType.CabinetMaker;
  }

  get invoiceDetails(): string {
    return `${this.invoiceAddress}, ${this.invoiceSuburb} ${this.invoiceState} ${this.invoicePostcode}`;
  }

  get deliveryDetails(): string {
    return `${this.deliveryAddress}, ${this.deliverySuburb} ${this.deliveryState} ${this.deliveryPostcode}`;
  }
}
