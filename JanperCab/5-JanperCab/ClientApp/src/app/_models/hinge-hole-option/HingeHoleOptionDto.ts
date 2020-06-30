import { FormGroup, FormControl, Validators } from '@angular/forms';

export class HingeHoleOptionDto {
  side: string;
  top: number;
  bottom: number;

  constructor(formValue: any) {
    this.side = formValue.side;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
  }

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

  toString(): string {
    return `${this.side} ${this.top}/${this.bottom}`;
  }
}
