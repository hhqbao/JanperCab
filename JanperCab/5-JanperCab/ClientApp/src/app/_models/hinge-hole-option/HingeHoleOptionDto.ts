import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';

export class HingeHoleOptionDto {
  id: number;
  side: string;
  top: number;
  bottom: number;

  constructor() {}

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      side: new FormControl(this.side, [Validators.required]),
      top: new FormControl(this.top, [Validators.required, Validators.min(50)]),
      bottom: new FormControl(this.bottom, [
        Validators.required,
        Validators.min(50),
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return `${this.side} ${this.top}/${this.bottom}`;
  }
}
