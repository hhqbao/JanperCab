import { DuraformOptionType } from './../duraform-option/DuraformOptionType';
import { DuraformComponentWithOptionForCart } from '../duraform-component-for-cart/DuraformComponentWithOptionForCart';

export class PantryDoorForCart extends DuraformComponentWithOptionForCart {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;

  constructor() {
    super();
  }

  updateWithOption(formValue: any, duraformOptionTypes: DuraformOptionType[]) {
    super.updateWithOption(formValue, duraformOptionTypes);
    this.chairRailHeight = formValue.chairRailHeight;
    this.chairRailTypeId = formValue.chairRailTypeId;
    this.extraRailBottom = formValue.extraRailBottom;
  }
}
