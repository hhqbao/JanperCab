import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class DistributorDto extends CustomerDto {
  constructor() {
    super();
    this.customerType = CustomerType.Distributor;
  }
}
