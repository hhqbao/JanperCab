import { DeliveryPatchDto } from './DeliveryPatchDto';
import { DeliveryRunSheetDto } from './DeliveryRunSheetDto';
import { DriverDto } from './../driver/DriverDto';
import { EnquiryForRunSheetDto } from './../enquiry/EnquiryForRunSheetDto';
import { Type } from 'class-transformer';

export class DeliveryRunSheetForListDto extends DeliveryRunSheetDto {
  @Type(() => DriverDto)
  driver: DriverDto;

  @Type(() => EnquiryForRunSheetDto)
  enquiriesForRunSheet: EnquiryForRunSheetDto[];

  getPatchDetails = (): DeliveryPatchDto[] => {
    const patches: DeliveryPatchDto[] = [];

    this.enquiriesForRunSheet.forEach((enquiry) => {
      const existPatch = patches.find((p) => p.hasSameAddress(enquiry));

      if (existPatch) {
        existPatch.enquiriesForRunSheet.push(enquiry);
      } else {
        patches.push(new DeliveryPatchDto(enquiry));
      }
    });

    return patches;
  };
}
