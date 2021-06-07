import { EnquiryForSheetDto } from './EnquiryForSheetDto';

export class EnquiryForPickUpSheetDto extends EnquiryForSheetDto {
  pickUpSheetId: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.Enquiry.EnquiryForPickUpSheetDto, 3-Application';
  }
}
