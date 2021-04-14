import { DeliveryRunSheetDto } from './DeliveryRunSheetDto';
import { DriverDto } from './../driver/DriverDto';
import { EnquiryForRunSheetDto } from './../enquiry/EnquiryForRunSheetDto';
import { Type } from 'class-transformer';

export class DeliveryRunSheetForListDto extends DeliveryRunSheetDto {
  @Type(() => DriverDto)
  driver: DriverDto;

  @Type(() => EnquiryForRunSheetDto)
  enquiriesForRunSheet: EnquiryForRunSheetDto[];
}
