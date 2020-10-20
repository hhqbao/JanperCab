import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Expose } from 'class-transformer';

export class DuraformOptionDoubleSidedDto extends DuraformOptionDto {
  hasProfile: boolean;

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      hasProfile: new FormControl(this.hasProfile),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return `${this.hasProfile ? '' : 'Plain Panel'} Double Sided`;
  }

  @Expose()
  toCabProValue(): string {
    return this.toString();
  }
}
