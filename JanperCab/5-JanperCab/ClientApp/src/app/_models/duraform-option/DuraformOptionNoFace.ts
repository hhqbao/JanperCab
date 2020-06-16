import { DuraformOptionType } from './DuraformOptionType';
import { DuraformOption } from './DuraformOption';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export class DuraformOptionNoFace extends DuraformOption {
  constructor(optionType: DuraformOptionType, optionValues: any) {
    super(optionType);
  }

  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
    });

    return formGroup;
  }

  toString(): string {
    return 'Panel No Face Route';
  }
}
