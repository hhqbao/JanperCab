import { DuraformWrappingOptionForList } from './../duraform-wrapping-option/DuraformWrappingOptionForList';
export class EndPanelForCart {
  quantity: number;
  height: number;
  width: number;
  numberOfShields: number;
  extraRailBottom: number;
  extraRailTop: number;
  extraRailLeft: number;
  extraRailRight: number;
  duraformWrappingOption: DuraformWrappingOptionForList;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;

  constructor() {
    this.duraformWrappingOption = null;
  }

  update = (
    formValue: any,
    wrappingOptions: DuraformWrappingOptionForList[]
  ) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.numberOfShields = formValue.numberOfShields;
    this.extraRailBottom = formValue.extraRailBottom;
    this.extraRailTop = formValue.extraRailTop;
    this.extraRailLeft = formValue.extraRailLeft;
    this.extraRailRight = formValue.extraRailRight;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

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
