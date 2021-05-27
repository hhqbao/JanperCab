import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';

export class DuraformOptionAngledShelfDto extends DuraformOptionDto {
  sideOne: number;
  sideTwo: number;
  isDoubleSided: boolean;

  get hasNoProfile(): boolean {
    return true;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      sideOne: new FormControl(this.sideOne, Validators.required),
      sideTwo: new FormControl(this.sideTwo, Validators.required),
      isDoubleSided: new FormControl(this.isDoubleSided),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return `ANGLED ${this.sideOne} x ${this.sideTwo} ${
      this.isDoubleSided ? 'DOUBLE' : 'SINGLE'
    } SIDED`;
  }

  @Expose()
  toCabProValue(): string {
    return 'No Longer Use This Function!';
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
    let extraPrice = 10;

    if (this.isDoubleSided) {
      extraPrice += (basePrice * 50) / 100;
    }

    return basePrice + extraPrice;
  }
}
