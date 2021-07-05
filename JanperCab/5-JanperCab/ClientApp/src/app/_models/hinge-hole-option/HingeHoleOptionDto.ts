import { HingeHoleStyleEnum } from '../../_enums/HingeHoleStyleEnum';
import { FormGroup } from '@angular/forms';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';

export abstract class HingeHoleOptionDto {
  $type: string;
  id: number;
  hingeHoleStyle: HingeHoleStyleEnum;

  constructor() {
    this.$type = '';
  }

  abstract getPrice(
    component: DuraformComponentWithOptionAndHingeHoleDto
  ): number;
  abstract update(hingeHoleFormValue: any): void;
  abstract toFormGroup(): FormGroup;
  abstract toString(): string;
}
