import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';

export class DuraformOptionRollerShutterFrameDto extends DuraformOptionDto {
  topSize: number;
  leftSize: number;
  rightSize: number;

  get hasNoProfile(): boolean {
    return true;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      topSize: new FormControl(this.topSize, [
        Validators.required,
        Validators.min(20),
      ]),
      leftSize: new FormControl(this.leftSize, [
        Validators.required,
        Validators.min(20),
      ]),
      rightSize: new FormControl(this.rightSize, [
        Validators.required,
        Validators.min(20),
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    const { topSize, leftSize, rightSize } = this;

    return `Roller Shutter ${topSize}T x ${leftSize}L x ${rightSize}R`;
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
    return basePrice + 11;
  }
}
