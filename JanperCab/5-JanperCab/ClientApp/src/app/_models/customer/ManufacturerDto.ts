import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class ManufacturerDto extends CustomerDto {
  constructor() {
    super();
    this.$type = '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application';
    this.customerType = CustomerType.Manufacturer;
  }
}
