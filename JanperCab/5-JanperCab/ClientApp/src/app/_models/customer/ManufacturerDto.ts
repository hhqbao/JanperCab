import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class ManufacturerDto extends CustomerDto {
  constructor() {
    super();
    this.customerType = CustomerType.Manufacturer;
  }
}
