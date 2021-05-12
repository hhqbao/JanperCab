import { EnquiryForRunSheetDto } from './../enquiry/EnquiryForRunSheetDto';

export class DeliveryPatchDto {
  customerId: number;
  customerName: string;
  fullAddress: string;
  enquiriesForRunSheet: EnquiryForRunSheetDto[];

  constructor(enquiry: EnquiryForRunSheetDto) {
    this.customerId = enquiry.customerId;
    this.customerName = enquiry.customerName;
    this.fullAddress = enquiry.getFullAddress();
    this.enquiriesForRunSheet = [enquiry];
  }

  hasSameAddress = (enquiry: EnquiryForRunSheetDto): boolean => {
    if (this.customerId !== enquiry.customerId) {
      return false;
    }

    return (
      this.fullAddress.toLowerCase() === enquiry.getFullAddress().toLowerCase()
    );
  };
}
