import { Type } from 'class-transformer';
import { DeliveryDocketType } from 'src/app/_enums/DeliveryDocketType';
import { EnquiryPaymentType } from 'src/app/_enums/EnquiryPaymentType';
import { EnquiryTypeEnum } from 'src/app/_enums/EnquiryTypeEnum';
import { CabinetMakerDto } from '../customer/CabinetMakerDto';
import { CustomerDto } from '../customer/CustomerDto';
import { DistributorDto } from '../customer/DistributorDto';
import { ManufacturerDto } from '../customer/ManufacturerDto';
import { InvoiceDto } from '../invoice/InvoiceDto';

export abstract class DeliveryDocketDto {
  deliveryDocketType: DeliveryDocketType;
  id: number;
  customerReference: string;
  enquiryType: EnquiryTypeEnum;
  enquiryPaymentType: EnquiryPaymentType;
  createdDate: Date;
  lastEditted: Date;
  orderedDate: Date;
  approvedDate: Date;

  creatorId: string;

  customerId: number;
  managerId: number;

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

  useBlackBoard: boolean;
  deliveryNote: string;

  gstRate: number;
  discountRate: number;

  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  notEditable: boolean;
  isDeclineable: boolean;

  deliveryRunSheetId: number;

  @Type(() => InvoiceDto)
  invoice: InvoiceDto;

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
  manager: CustomerDto;
}
