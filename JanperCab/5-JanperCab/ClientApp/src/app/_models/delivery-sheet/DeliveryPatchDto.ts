import { EnquiryForSheetDto } from '../enquiry/EnquiryForSheetDto';
export class DeliveryPatchDto {
  customerId: number;
  customerName: string;
  fullAddress: string;
  enquiriesForSheet: EnquiryForSheetDto[];

  constructor(enquiry: EnquiryForSheetDto) {
    this.customerId = enquiry.customerId;
    this.customerName = enquiry.customerName;
    this.fullAddress = enquiry.getFullAddress();
    this.enquiriesForSheet = [enquiry];
  }

  hasSameAddress = (enquiry: EnquiryForSheetDto): boolean => {
    if (this.customerId !== enquiry.customerId) {
      return false;
    }

    return (
      this.fullAddress.toLowerCase() === enquiry.getFullAddress().toLowerCase()
    );
  };
}
