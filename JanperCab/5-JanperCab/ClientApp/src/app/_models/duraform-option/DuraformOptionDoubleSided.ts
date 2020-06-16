import { DuraformOptionType } from './DuraformOptionType';
import { DuraformOption } from './DuraformOption';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export class DuraformOptionDoubleSided extends DuraformOption {
  hasProfile: boolean;

  constructor(optionType: DuraformOptionType, optionValues: any) {
    super(optionType);
    this.hasProfile = optionValues.hasProfile;
  }

  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      hasProfile: new FormControl(this.hasProfile),
    });

    return formGroup;
  }

  toString(): string {
    return `${this.hasProfile ? '' : 'Plain Panel'} Double Sided`;
  }
}
