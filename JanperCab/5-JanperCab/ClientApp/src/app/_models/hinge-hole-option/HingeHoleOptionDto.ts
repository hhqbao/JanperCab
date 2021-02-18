import { DuraformDoorDto } from 'src/app/_models/duraform-component/DuraformDoorDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { HingeHoleStyleEnum } from '../../_enums/HingeHoleStyleEnum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';

export class HingeHoleOptionDto {
  id: number;
  hingeHoleStyle: HingeHoleStyleEnum;
  quantity: 1 | 2 | 3 | 4;
  top: number;
  topCenter: number;
  bottomCenter: number;
  bottom: number;

  constructor() {}

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      hingeHoleStyle: new FormControl(this.hingeHoleStyle, [
        Validators.required,
      ]),
      quantity: new FormControl(this.quantity, [
        Validators.required,
        Validators.min(1),
        Validators.max(4),
      ]),
      top: new FormControl(this.top, [Validators.required, Validators.min(50)]),
      topCenter: new FormControl(this.topCenter, []),
      bottomCenter: new FormControl(this.bottomCenter, []),
      bottom: new FormControl(this.bottom, []),
    });

    if (this.quantity >= 2) {
      formGroup
        .get('bottom')
        .setValidators([Validators.required, Validators.min(50)]);
      formGroup.get('bottom').updateValueAndValidity();
    }

    if (this.quantity >= 3) {
      formGroup
        .get('topCenter')
        .setValidators([Validators.required, Validators.min(50)]);
      formGroup.get('topCenter').updateValueAndValidity();
    }

    if (this.quantity === 4) {
      formGroup
        .get('bottomCenter')
        .setValidators([Validators.required, Validators.min(50)]);
      formGroup.get('bottomCenter').updateValueAndValidity();
    }

    return formGroup;
  }

  @Expose()
  toString(): string {
    const style = HingeHoleStyleEnum[this.hingeHoleStyle];

    switch (this.quantity) {
      case 1:
        return `${style} ${this.top}`;
      case 2:
        return `${style} ${this.top}/${this.bottom}`;
      case 3:
        return `${style} ${this.top}/${this.topCenter}/${this.bottom}`;
      case 4:
        return `${style} ${this.top}/${this.topCenter}/${this.bottomCenter}/${this.bottom}`;
      default:
        return `Unsupported Hinge Hole Quantity`;
    }
  }
}
