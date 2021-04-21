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

  distributorId: number;
  cabinetMakerId: number;

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

  deliveryRunSheetId: number;

  @Type(() => InvoiceDto)
  invoice: InvoiceDto;

  get discriminator(): string {
    return `${this.enquiryType}`;
  }

  get hasBeenInvoiced(): boolean {
    return this.invoice !== null && this.invoice !== undefined;
  }

  constructor() {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.enquiryType = EnquiryTypeEnum.Draft;

    this.gstRate = 10;
    this.discountRate = 0;
    this.deliveryFee = 30;
  }

  abstract calculatePrice(): void;
}
