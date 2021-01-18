import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';

export class DuraformOptionAngledShelfDto extends DuraformOptionDto {
  sideOne: number;
  sideTwo: number;
  isDoubleSided: boolean;

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
}
