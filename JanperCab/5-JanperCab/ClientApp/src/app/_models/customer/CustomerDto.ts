import { CustomerCategoryCBDDto } from './../customer-category/CustomerCategoryCBDDto';
import { CustomerCategoryAccountDto } from './../customer-category/CustomerCategoryAccountDto';
import { Type } from 'class-transformer';
import { CustomerCategoryDto } from '../customer-category/CustomerCategoryDto';
import { CustomerType } from './../../_enums/CustomerType';
import { CabinetMakerDto } from './CabinetMakerDto';
import { DistributorDto } from './DistributorDto';
import { ManufacturerDto } from './ManufacturerDto';

export abstract class CustomerDto {
  $type: string;
  id: number;
  managerId: number;
  customerType: CustomerType;
  customerCategoryId: number;
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
  deliveryFee: number;

  isOnHold: boolean;

  @Type(() => CustomerCategoryDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CustomerCategoryAccountDto,
          name: '_3_Application.Dtos.CustomerCategory.CustomerCategoryAccountDto, 3-Application',
        },
        {
          value: CustomerCategoryCBDDto,
          name: '_3_Application.Dtos.CustomerCategory.CustomerCategoryCBDDto, 3-Application',
        },
      ],
    },
  })
  customerCategory: CustomerCategoryDto;

  get invoiceDetails(): string {
    return `${this.invoiceAddress}, ${this.invoiceSuburb} ${this.invoiceState} ${this.invoicePostcode}`;
  }

  get deliveryDetails(): string {
    return `${this.deliveryAddress}, ${this.deliverySuburb} ${this.deliveryState} ${this.deliveryPostcode}`;
  }

  constructor() {}
}
