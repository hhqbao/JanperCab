import { CustomerType } from './../../_enums/CustomerType';

export abstract class CustomerDto {
  id: number;
  customerType: CustomerType;
  name: string;
  imageUrl: string;
  email: string;
  phone: string;
}
