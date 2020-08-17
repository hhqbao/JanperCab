import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class DistributorDto extends CustomerDto {
  quoteNumberSeed: number;
  orderNumberSeed: number;

  constructor() {
    super();
    this.customerType = CustomerType.Distributor;
  }
}
