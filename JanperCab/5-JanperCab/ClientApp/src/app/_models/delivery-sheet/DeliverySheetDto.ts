import { EnquiryForSheetDto } from './../enquiry/EnquiryForSheetDto';
import { DeliveryMethodEnum } from './../../_enums/DeliveryMethodEnum';
import { Type } from 'class-transformer';

export abstract class DeliverySheetDto {
  $type: string;
  id: number;
  deliveryMethod: DeliveryMethodEnum;
  createdDate: Date;
  lockedDate: Date;
  completedDate: Date;

  @Type(() => EnquiryForSheetDto)
  enquiriesForSheet: EnquiryForSheetDto[];

  constructor() {
    this.$type = '';
  }

  get isEditable(): boolean {
    return !this.lockedDate && !this.completedDate;
  }

  abstract getBarcodePrefix(): string;
  abstract getDescription(): string;
}
