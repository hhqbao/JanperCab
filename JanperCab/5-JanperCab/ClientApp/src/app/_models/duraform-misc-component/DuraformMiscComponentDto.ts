import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from './../../_enums/DuraformMiscTypeEnum';

export abstract class DuraformMiscComponentDto {
  $type: string;
  id: number;
  duraformEnquiryId: number;
  quantity: number;
  price: number;

  constructor() {
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscComponentDto, 3-Application';
  }

  abstract get miscType(): DuraformMiscTypeEnum;
  abstract update(formGroup: FormGroup): void;
  abstract calculatePrice(duraformEnquiry: DuraformEnquiryDto): void;
  abstract toString(): string;
}
