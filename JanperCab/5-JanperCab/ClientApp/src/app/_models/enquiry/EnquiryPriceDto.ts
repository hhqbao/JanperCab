import { EnquiryDto } from './EnquiryDto';

export abstract class EnquiryPriceDto {
  $type: string;
  id: number;

  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  constructor(enquiry: EnquiryDto) {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.id = enquiry.id;
    this.deliveryFee = enquiry.deliveryFee;
    this.subTotal = enquiry.subTotal;
    this.totalGst = enquiry.totalGst;
    this.totalPrice = enquiry.totalPrice;
  }
}
