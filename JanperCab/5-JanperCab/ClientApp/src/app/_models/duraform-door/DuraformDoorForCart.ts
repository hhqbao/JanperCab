import { DuraformWrappingOptionForList } from './../duraform-wrapping-option/DuraformWrappingOptionForList';
import { DuraformDoorOptionForList } from './../duraform-door-option/DuraformDoorOptionForList';

export class DuraformDoorForCart {
  quantity: number;
  height: number;
  width: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  duraformDoorOption: DuraformDoorOptionForList;
  duraformWrappingOption: DuraformWrappingOptionForList;
  note: string;

  constructor() {
    this.duraformDoorOption = null;
    this.duraformWrappingOption = null;
  }

  update = (
    formValue: any,
    doorOptions: DuraformDoorOptionForList[],
    wrappingOptions: DuraformWrappingOptionForList[]
  ) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

    if (formValue.optionId) {
      const option = doorOptions.find((x) => x.id === +formValue.optionId);
      this.duraformDoorOption = option;
    } else {
      this.duraformDoorOption = null;
    }

    if (formValue.wrappingOptionId) {
      const option = wrappingOptions.find(
        (x) => x.id === +formValue.wrappingOptionId
      );
      this.duraformWrappingOption = option;
    } else {
      this.duraformWrappingOption = null;
    }
  };
}
