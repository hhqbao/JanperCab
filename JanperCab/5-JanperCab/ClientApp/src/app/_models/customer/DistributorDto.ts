import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class DistributorDto extends CustomerDto {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  contactPerson: string;

  constructor() {
    super();
    this.customerType = CustomerType.Distributor;
  }
}
