import { HingeHoleDirectionEnum } from './../../_enums/HingeHoleDirectionEnum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { HingeHoleStyleEnum } from 'src/app/_enums/HingeHoleStyleEnum';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { HingeHoleOptionDto } from './HingeHoleOptionDto';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';

export class HingeHoleOptionSideDto extends HingeHoleOptionDto {
  direction: HingeHoleDirectionEnum;
  quantity: 1 | 2 | 3 | 4 | 5;
  top: number;
  topCenter: number;
  middleOne: number;
  bottomCenter: number;
  bottom: number;

  constructor() {
    super();
    this.hingeHoleStyle = HingeHoleStyleEnum.Side;
    this.direction = HingeHoleDirectionEnum.Left;
    this.quantity = 2;
    this.top = 96;
    this.bottom = 96;
  }

  @Expose()
  getPrice(component: DuraformComponentWithOptionAndHingeHoleDto): number {
    const hingeStyle = DuraformAssetService.instance.getHingeStyle(
      this.hingeHoleStyle
    );

    switch (component.componentType) {
      case DuraformComponentTypeEnum.Door:
        return this.quantity * hingeStyle.doorPrice;
      case DuraformComponentTypeEnum.PantryDoor:
        return this.quantity * hingeStyle.pantryPrice;
    }
  }

  @Expose()
  update(hingeHoleFormValue: any): void {
    this.direction = hingeHoleFormValue.direction;
    this.quantity = hingeHoleFormValue.quantity;
    this.top = hingeHoleFormValue.top;
    this.topCenter = hingeHoleFormValue.topCenter;
    this.middleOne = hingeHoleFormValue.middleOne;
    this.bottomCenter = hingeHoleFormValue.bottomCenter;
    this.bottom = hingeHoleFormValue.bottom;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      hingeHoleStyle: new FormControl(this.hingeHoleStyle, [
        Validators.required,
      ]),
      direction: new FormControl(this.direction, [Validators.required]),
      quantity: new FormControl(this.quantity, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      top: new FormControl(this.top, [Validators.required, Validators.min(50)]),
      topCenter: new FormControl(this.topCenter, []),
      middleOne: new FormControl(this.middleOne, []),
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

    if (this.quantity >= 4) {
      formGroup
        .get('bottomCenter')
        .setValidators([Validators.required, Validators.min(50)]);
      formGroup.get('bottomCenter').updateValueAndValidity();
    }

    if (this.quantity >= 5) {
      formGroup
        .get('middleOne')
        .setValidators([Validators.required, Validators.min(50)]);
      formGroup.get('middleOne').updateValueAndValidity();
    }

    return formGroup;
  }

  @Expose()
  toString(): string {
    const dir = HingeHoleDirectionEnum[this.direction];

    switch (this.quantity) {
      case 1:
        return `${dir} ${this.top}`;
      case 2:
        return `${dir} ${this.top}/${this.bottom}`;
      case 3:
        return `${dir} ${this.top}/${this.topCenter}/${this.bottom}`;
      case 4:
        return `${dir} ${this.top}/${this.topCenter}/${this.bottomCenter}/${this.bottom}`;
      case 5:
        return `${dir} ${this.top}/${this.topCenter}/${this.middleOne}/${this.bottomCenter}/${this.bottom}`;
      default:
        return `Unsupported Hinge Hole Quantity`;
    }
  }
}
