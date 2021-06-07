import { EnquiryForSheetDto } from './EnquiryForSheetDto';

export class EnquiryForRunSheetDto extends EnquiryForSheetDto {
  deliveryRunSheetId: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.Enquiry.EnquiryForRunSheetDto, 3-Application';
  }

  getFullAddress = (): string => {
    return `${this.address}, ${this.suburb} ${this.state} ${this.postcode}`;
  };
}
