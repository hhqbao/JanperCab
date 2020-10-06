import { HingeHoleOptionDto } from './../hinge-hole-option/HingeHoleOptionDto';
import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Type } from 'class-transformer';

export abstract class DuraformComponentWithOptionAndHingeHoleDto extends DuraformComponentWithOptionDto {
  @Type(() => HingeHoleOptionDto)
  hingeHoleOption: HingeHoleOptionDto;

  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    if (formValue.hingeHole) {
      const id = this.hingeHoleOption?.id;

      this.hingeHoleOption = new HingeHoleOptionDto();
      this.hingeHoleOption.id = id;
      this.hingeHoleOption.side = formValue.hingeHole.side;
      this.hingeHoleOption.quantity = formValue.hingeHole.quantity;
      this.hingeHoleOption.top = formValue.hingeHole.top;
      this.hingeHoleOption.topCenter = formValue.hingeHole.topCenter;
      this.hingeHoleOption.bottomCenter = formValue.hingeHole.bottomCenter;
      this.hingeHoleOption.bottom = formValue.hingeHole.bottom;
    } else {
      this.hingeHoleOption = null;
    }
  }
}
