import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { DuraformComponentWithOptionForCart } from '../duraform-component-for-cart/DuraformComponentWithOptionForCart';
import { HingeHoleOptionDto } from '../hinge-hole-option/HingeHoleOptionDto';

export class PantryDoorForCart extends DuraformComponentWithOptionForCart {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;
  hingeHoleOption: HingeHoleOptionDto;

  constructor() {
    super();
    this.hingeHoleOption = null;
  }

  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);
    this.chairRailHeight = formValue.chairRailHeight;
    this.chairRailTypeId = formValue.chairRailTypeId;
    this.extraRailBottom = formValue.extraRailBottom;

    if (formValue.hingeHole) {
      this.hingeHoleOption = new HingeHoleOptionDto(formValue.hingeHole);
    } else {
      this.hingeHoleOption = null;
    }
  }
}
