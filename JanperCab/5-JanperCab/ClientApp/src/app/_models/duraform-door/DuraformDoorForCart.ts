import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';
import { DuraformOption } from '../duraform-option/DuraformOption';
export class DuraformDoorForCart {
  quantity: number;
  height: number;
  width: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  duraformOption: DuraformOption;
  note: string;

  constructor() {
    this.duraformOption = null;
  }

  update = (formValue: any, duraformOptionTypes: DuraformOptionType[]) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

    if (formValue.optionGroup) {
      const optionType = duraformOptionTypes.find(
        (x) => x.id === formValue.optionGroup.optionTypeId
      );

      if (!optionType) {
        throw new Error('Duraform Option Type Not Found');
      }

      this.duraformOption = DuraformOptionType.GetDuraformOptionInstance(
        optionType,
        formValue.optionGroup
      );
    } else {
      this.duraformOption = null;
    }
  };
}
