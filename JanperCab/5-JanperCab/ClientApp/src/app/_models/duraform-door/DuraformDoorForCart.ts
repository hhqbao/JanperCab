import { HingeHoleOptionDto } from './../hinge-hole-option/HingeHoleOptionDto';
import { DuraformOptionTypeDto } from 'src/app/_models/duraform-option/DuraformOptionTypeDto';
import { DuraformOptionDto } from '../duraform-option/DuraformOptionDto';
import { DuraformComponentWithOptionForCart } from '../duraform-component-for-cart/DuraformComponentWithOptionForCart';

export class DuraformDoorForCart extends DuraformComponentWithOptionForCart {
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

    if (formValue.hingeHole) {
      this.hingeHoleOption = new HingeHoleOptionDto(formValue.hingeHole);
    } else {
      this.hingeHoleOption = null;
    }
  }
}
