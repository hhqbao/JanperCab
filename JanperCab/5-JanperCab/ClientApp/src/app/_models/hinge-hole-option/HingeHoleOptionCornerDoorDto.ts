import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';
import { HingeHoleStyleEnum } from 'src/app/_enums/HingeHoleStyleEnum';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { HingeHoleOptionDto } from './HingeHoleOptionDto';

export class HingeHoleOptionCornerDoorDto extends HingeHoleOptionDto {
  leftTop: number;
  leftBottom: number;
  rightTop: number;
  rightBottom: number;

  constructor() {
    super();
    this.hingeHoleStyle = HingeHoleStyleEnum.CornerDoor;
    this.leftTop = 96;
    this.leftBottom = 96;
    this.rightTop = 96;
    this.rightBottom = 96;
  }

  getPrice(component: DuraformComponentWithOptionAndHingeHoleDto): number {
    const hingeStyle = DuraformAssetService.instance.getHingeStyle(
      this.hingeHoleStyle
    );

    switch (component.componentType) {
      case DuraformComponentTypeEnum.Door:
        return hingeStyle.doorPrice;
      case DuraformComponentTypeEnum.PantryDoor:
        return hingeStyle.pantryPrice;
    }
  }

  update(hingeHoleFormValue: any): void {
    this.leftTop = hingeHoleFormValue.leftTop;
    this.leftBottom = hingeHoleFormValue.leftBottom;
    this.rightTop = hingeHoleFormValue.rightTop;
    this.rightBottom = hingeHoleFormValue.rightBottom;
  }

  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      hingeHoleStyle: new FormControl(this.hingeHoleStyle, [
        Validators.required,
      ]),
      leftTop: new FormControl(this.leftTop, [Validators.required]),
      leftBottom: new FormControl(this.leftBottom, [Validators.required]),
      rightTop: new FormControl(this.rightTop, [Validators.required]),
      rightBottom: new FormControl(this.rightBottom, [Validators.required]),
    });

    return formGroup;
  }

  toString(): string {
    return `Corner ${this.leftTop}LT | ${this.leftBottom} LB | ${this.rightTop} RT | ${this.rightBottom} RB`;
  }
}
