import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose } from 'class-transformer';

export class DuraformPantryDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    this.chairRailHeight = formValue.chairRailHeight;
    this.chairRailTypeId = formValue.chairRailTypeId;
    this.extraRailBottom = formValue.extraRailBottom;
  }
}
