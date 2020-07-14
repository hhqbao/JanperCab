import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';

export class DuraformEndPanelDto extends DuraformComponentWithOptionDto {
  numberOfShields: number;
  railLeft: number;
  railCenter: number;
  railRight: number;
  extraRailBottom: number;
  extraRailTop: number;

  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    this.numberOfShields = formValue.numberOfShields;
    this.railLeft = formValue.railLeft;
    this.railCenter = formValue.railCenter;
    this.railRight = formValue.railRight;
    this.extraRailBottom = formValue.extraRailBottom;
    this.extraRailTop = formValue.extraRailTop;
  }
}
