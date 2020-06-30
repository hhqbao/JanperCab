import { HingeHoleOptionDto } from './../hinge-hole-option/HingeHoleOptionDto';
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';
import { DuraformOption } from '../duraform-option/DuraformOption';
import { DuraformComponentWithOptionForCart } from '../duraform-component-for-cart/DuraformComponentWithOptionForCart';

export class DuraformDoorForCart extends DuraformComponentWithOptionForCart {
  hingeHoleOption: HingeHoleOptionDto;

  constructor() {
    super();
    this.hingeHoleOption = null;
  }

  updateWithOption(formValue: any, duraformOptionTypes: DuraformOptionType[]) {
    super.updateWithOption(formValue, duraformOptionTypes);

    if (formValue.hingeHole) {
      this.hingeHoleOption = new HingeHoleOptionDto(formValue.hingeHole);
    } else {
      this.hingeHoleOption = null;
    }
  }
}
