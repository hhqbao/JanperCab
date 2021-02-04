import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';

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
  getExtraCharge(basePrice: number): number {
    if (!this.isDoubleSided) return 10;

    let extraPrice = (basePrice * 50) / 100;

    return extraPrice + 10;
  }
}
