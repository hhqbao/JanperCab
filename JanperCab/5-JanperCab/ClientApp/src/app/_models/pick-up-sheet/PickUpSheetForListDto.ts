import { EnquiryForPickUpSheetDto } from './../enquiry/EnquiryForPickUpSheetDto';
import { Type } from 'class-transformer';
import { PickUpSheetDto } from './PickUpSheetDto';

export class PickUpSheetForListDto extends PickUpSheetDto {
  @Type(() => EnquiryForPickUpSheetDto)
  enquiriesForPickUpSheet: EnquiryForPickUpSheetDto[];
}
