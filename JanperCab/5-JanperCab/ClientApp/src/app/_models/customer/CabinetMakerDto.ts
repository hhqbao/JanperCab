import { CustomerDto } from './CustomerDto';
import { CustomerType } from 'src/app/_enums/CustomerType';

export class CabinetMakerDto extends CustomerDto {
  constructor() {
    super();
    this.$type = '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application';
    this.customerType = CustomerType.CabinetMaker;
  }
}
