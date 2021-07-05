import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';
import { HingeHoleStyleEnum } from 'src/app/_enums/HingeHoleStyleEnum';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { HingeHoleOptionDto } from './HingeHoleOptionDto';

export class HingeHoleOptionDrawDto extends HingeHoleOptionDto {
  constructor() {
    super();
    this.hingeHoleStyle = HingeHoleStyleEnum.Draw;
  }

  @Expose()
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

  @Expose()
  update(hingeHoleFormValue: any): void {
    return;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      hingeHoleStyle: new FormControl(this.hingeHoleStyle, [
        Validators.required,
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    return 'Draw';
  }
}
