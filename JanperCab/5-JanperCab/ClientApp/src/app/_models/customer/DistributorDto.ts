import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class DistributorDto extends CustomerDto {
  constructor() {
    super();
    this.$type = '_3_Application.Dtos.Customer.DistributorDto, 3-Application';
    this.customerType = CustomerType.Distributor;
  }
}
