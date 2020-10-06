import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';

export class HingeHoleOptionDto {
  id: number;
  side: string;
  quantity: 2 | 3 | 4;
  top: number;
  topCenter: number;
  bottomCenter: number;
  bottom: number;

  constructor() {}

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      side: new FormControl(this.side, [Validators.required]),
      quantity: new FormControl(this.quantity, [
        Validators.required,
        Validators.min(2),
        Validators.max(4),
      ]),
      top: new FormControl(this.top, [Validators.required, Validators.min(50)]),
      topCenter: new FormControl(this.topCenter, []),
      bottomCenter: new FormControl(this.bottomCenter, []),
      bottom: new FormControl(this.bottom, [
        Validators.required,
        Validators.min(50),
      ]),
    });

    if (this.quantity >= 3) {
      formGroup
        .get('topCenter')
        .setValidators([Validators.required, Validators.min(50)]);
    }

    if (this.quantity === 4) {
      formGroup
        .get('bottomCenter')
        .setValidators([Validators.required, Validators.min(50)]);
    }

    return formGroup;
  }

  @Expose()
  toString(): string {
    switch (this.quantity) {
      case 2:
        return `${this.side} ${this.top}/${this.bottom}`;
      case 3:
        return `${this.side} ${this.top}/${this.topCenter}/${this.bottom}`;
      case 4:
        return `${this.side} ${this.top}/${this.topCenter}/${this.bottomCenter}/${this.bottom}`;
      default:
        return `Unsupported Hinge Hole Quantity`;
    }
  }
}
