import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { FormGroup } from '@angular/forms';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';

export abstract class DuraformOptionDto {
  $type: string;
  id: number;
  duraformOptionTypeId: DuraformOptionTypeKey;

  abstract get hasNoProfile(): boolean;

  abstract getExtraWidth(): number;
  abstract calculateUnitPrice(
    basePrice: number,
    duraformEnquiry: DuraformEnquiryDto,
    component: DuraformComponentWithOptionDto
  ): number;

  abstract toFormGroup(): FormGroup;
  abstract toString(): string;
  abstract toCabProValue(): string;
}
