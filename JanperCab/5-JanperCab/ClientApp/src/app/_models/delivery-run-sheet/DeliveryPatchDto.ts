import { EnquiryForRunSheetDto } from './../enquiry/EnquiryForRunSheetDto';

export class DeliveryPatchDto {
  cabinetMakerId: number;
  cabinetMakerName: string;
  fullAddress: string;
  enquiriesForRunSheet: EnquiryForRunSheetDto[];

  constructor(enquiry: EnquiryForRunSheetDto) {
    this.cabinetMakerId = enquiry.cabinetMakerId;
    this.cabinetMakerName = enquiry.cabinetMakerName;
    this.fullAddress = enquiry.getFullAddress();
    this.enquiriesForRunSheet = [enquiry];
  }

  hasSameAddress = (enquiry: EnquiryForRunSheetDto): boolean => {
    if (this.cabinetMakerId !== enquiry.cabinetMakerId) {
      return false;
    }

    return (
      this.fullAddress.toLowerCase() === enquiry.getFullAddress().toLowerCase()
    );
  };
}
