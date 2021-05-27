import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';

export class DuraformOptionDoubleSidedDto extends DuraformOptionDto {
  hasProfile: boolean;

  get hasNoProfile(): boolean {
    return !this.hasProfile;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      hasProfile: new FormControl(this.hasProfile),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return `${this.hasProfile ? '' : 'Plain Panel'} Double Sided`;
  }

  @Expose()
  toCabProValue(): string {
    return this.toString();
  }

  @Expose()
  getExtraWidth(): number {
    return 0;
  }

  @Expose()
  calculateUnitPrice(
    basePrice: number,
    duraformEnquiry: DuraformEnquiryDto,
    component: DuraformComponentWithOptionDto
  ): number {
    const extraCharge = (basePrice * 50) / 100;

    return basePrice + extraCharge;
  }
}
