import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Expose } from 'class-transformer';

export class DuraformOptionNoFaceDto extends DuraformOptionDto {
  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return 'PANEL NO FACE ROUT';
  }

  @Expose()
  toCabProValue(): string {
    return 'PANEL NO FACE ROUT';
  }
}
