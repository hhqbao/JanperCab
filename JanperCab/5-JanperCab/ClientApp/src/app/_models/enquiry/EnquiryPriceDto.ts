import { EnquiryDto } from './EnquiryDto';

export abstract class EnquiryPriceDto {
  $type: string;
  id: number;

  toBePriced: boolean;
  isShippingRequired: boolean;
  hasFixedPrice: boolean;
  deliveryFee: number;
  subTotal: number;
  totalGst: number;
  totalPrice: number;

  constructor(enquiry: EnquiryDto) {
    this.$type = '_3_Application.Dtos.Enquiry.EnquiryDto, 3-Application';
    this.id = enquiry.id;
    this.toBePriced = enquiry.toBePriced;
    this.isShippingRequired = enquiry.isShippingRequired;
    this.hasFixedPrice = enquiry.hasFixedPrice;
    this.deliveryFee = enquiry.deliveryFee;
    this.subTotal = enquiry.subTotal;
    this.totalGst = enquiry.totalGst;
    this.totalPrice = enquiry.totalPrice;
  }
}
