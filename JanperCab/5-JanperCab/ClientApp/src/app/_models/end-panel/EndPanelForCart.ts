import { DuraformOptionType } from './../duraform-option/DuraformOptionType';
import { DuraformComponentWithOptionForCart } from '../duraform-component-for-cart/DuraformComponentWithOptionForCart';

export class EndPanelForCart extends DuraformComponentWithOptionForCart {
  numberOfShields: number;
  railLeft: number;
  railCenter: number;
  railRight: number;
  extraRailBottom: number;
  extraRailTop: number;

  updateWithOption(formValue: any, duraformOptionTypes: DuraformOptionType[]) {
    super.updateWithOption(formValue, duraformOptionTypes);
    this.numberOfShields = formValue.numberOfShields;
    this.railLeft = formValue.railLeft;
    this.railCenter = formValue.railCenter;
    this.railRight = formValue.railRight;
    this.extraRailBottom = formValue.extraRailBottom;
    this.extraRailTop = formValue.extraRailTop;
  }
}
