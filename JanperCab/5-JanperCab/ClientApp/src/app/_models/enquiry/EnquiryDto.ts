import { ManufacturerDto } from './../customer/ManufacturerDto';
import { DistributorDto } from './../customer/DistributorDto';
import { CabinetMakerDto } from './../customer/CabinetMakerDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { InvoiceDto } from './../invoice/InvoiceDto';
import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';
import { Type } from 'class-transformer';

export abstract class EnquiryDto {
  $type: string;
  id: number;
  customerReference: string;
  enquiryType: EnquiryTypeEnum;
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

  get discriminator(): string {
    return `${this.enquiryType}`;
  }

  get hasBeenInvoiced(): boolean {
    return this.invoice !== null && this.invoice !== undefined;
  }

  abstract get jobType(): string;

  constructor() {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.enquiryType = EnquiryTypeEnum.Draft;

    this.gstRate = 10;
    this.discountRate = 0;
    this.deliveryFee = 30;
  }

  abstract calculatePrice(): void;
}
