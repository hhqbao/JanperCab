import { CabinetMakerDto } from './../customer/CabinetMakerDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { Type } from 'class-transformer';
import { InvoiceComponentDto } from './InvoiceComponentDto';
import { DistributorDto } from '../customer/DistributorDto';
import { ManufacturerDto } from '../customer/ManufacturerDto';
export class InvoiceDto {
  id: number;
  enquiryId: number;
  createdDate: Date;

  customerId: number;
  customerReference: string;

  doorType: string;
  doorColor: string;

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

  hasFixedPrice: boolean;
  gstRate: number;
  discountRate: number;
  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
      ],
    },
  })
  customer: CustomerDto;

  @Type(() => InvoiceComponentDto)
  invoiceComponents: InvoiceComponentDto[];
}
