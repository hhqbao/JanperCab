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
  note: string;

  constructor() {
    this.duraformDoorOption = null;
  }

  update = (formValue: any, doorOptions: DuraformDoorOptionForList[]) => {
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
  };
}
