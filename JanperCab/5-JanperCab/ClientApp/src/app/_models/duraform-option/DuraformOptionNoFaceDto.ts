import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export class DuraformOptionNoFaceDto extends DuraformOptionDto {
  constructor(optionType: DuraformOptionTypeDto, optionValues: any) {
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
