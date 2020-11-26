import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';

export class DuraformOptionMicrowaveFrameDto extends DuraformOptionDto {
  topSize: number;
  bottomSize: number;
  leftSize: number;
  rightSize: number;

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
      bottomSize: new FormControl(this.bottomSize, [
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
    const { topSize, bottomSize, leftSize, rightSize } = this;

    return `Microwave Frame ${topSize}T ${bottomSize}B ${leftSize}L ${rightSize}R`;
  }

  @Expose()
  toCabProValue(): string {
    return this.toString();
  }
}
