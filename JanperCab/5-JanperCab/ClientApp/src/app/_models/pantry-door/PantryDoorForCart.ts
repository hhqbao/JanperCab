import { DuraformWrappingOptionForList } from './../duraform-wrapping-option/DuraformWrappingOptionForList';
import { PantryDoorChairRailTypeForList } from '../pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';

export class PantryDoorForCart {
  quantity: number;
  height: number;
  width: number;
  chairRailHeight: number;
  chairRailType: PantryDoorChairRailTypeForList;
  extraRailBottom: number;
  duraformWrappingOption: DuraformWrappingOptionForList;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;

  constructor() {
    this.chairRailType = null;
    this.duraformWrappingOption = null;
  }

  update = (
    formValue: any,
    railTypes: PantryDoorChairRailTypeForList[],
    wrappingOptions: DuraformWrappingOptionForList[]
  ) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.chairRailHeight = formValue.chairRailHeight;
    this.extraRailBottom = formValue.extraRailBottom;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

    const railType = railTypes.find((x) => x.id === +formValue.chairRailTypeId);
    this.chairRailType = railType;

    if (formValue.wrappingOptionId) {
      const wrappingOption = wrappingOptions.find(
        (x) => x.id === +formValue.wrappingOptionId
      );
      this.duraformWrappingOption = wrappingOption;
    } else {
      this.duraformWrappingOption = null;
    }
  };
}
