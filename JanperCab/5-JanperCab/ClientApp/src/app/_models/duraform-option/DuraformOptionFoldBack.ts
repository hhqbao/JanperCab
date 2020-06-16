import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';
import { DuraformOption } from './DuraformOption';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class DuraformOptionFoldBack extends DuraformOption {
  hasProfile: boolean;
  length: number;
  thickness: number;
  hasDoubleReturn: boolean;

  constructor(optionType: DuraformOptionType, optionValues: any) {
    super(optionType);
    this.hasProfile = optionValues.hasProfile;
    this.length = optionValues.length;
    this.thickness = optionValues.thickness;
    this.hasDoubleReturn = optionValues.hasDoubleReturn;
  }

  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      hasProfile: new FormControl(this.hasProfile),
      length: new FormControl(this.length, [Validators.required]),
      thickness: new FormControl(this.thickness, [Validators.required]),
      hasDoubleReturn: new FormControl(this.hasDoubleReturn),
    });

    return formGroup;
  }

  toString(): string {
    let value = `${this.length}x${this.thickness} `;
    value += `${this.hasDoubleReturn ? 'Double' : 'Single'} Return`;
    value += `${this.hasProfile ? '' : ' End Panel'}`;

    return value;
  }
}
