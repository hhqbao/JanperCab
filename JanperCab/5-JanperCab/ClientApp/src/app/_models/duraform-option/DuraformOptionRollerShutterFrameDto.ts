import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';

export class DuraformOptionRollerShutterFrameDto extends DuraformOptionDto {
  topSize: number;
  leftSize: number;
  rightSize: number;

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
  toString(): string {
    const { topSize, leftSize, rightSize } = this;

    return `Roller Shutter ${topSize}T x ${leftSize}L x ${rightSize}R`;
  }
}
