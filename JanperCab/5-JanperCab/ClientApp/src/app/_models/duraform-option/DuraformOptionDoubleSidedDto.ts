import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export class DuraformOptionDoubleSidedDto extends DuraformOptionDto {
  hasProfile: boolean;

  constructor(optionType: DuraformOptionTypeDto, optionValues: any) {
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
