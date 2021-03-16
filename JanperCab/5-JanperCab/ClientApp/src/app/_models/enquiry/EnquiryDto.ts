import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';

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
  notEditable: boolean;

  totalPrice: number;

  get discriminator(): string {
    return `${this.enquiryType}`;
  }

  constructor() {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.enquiryType = EnquiryTypeEnum.Draft;
  }

  abstract calculatePrice(): void;
}
