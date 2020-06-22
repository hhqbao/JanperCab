import { DuraformOptionType } from './../duraform-option/DuraformOptionType';
import { PantryDoorChairRailTypeForList } from '../pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformOption } from '../duraform-option/DuraformOption';

export class PantryDoorForCart {
  quantity: number;
  height: number;
  width: number;
  chairRailHeight: number;
  chairRailType: PantryDoorChairRailTypeForList;
  extraRailBottom: number;
  duraformEdgeProfileId: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  duraformOption: DuraformOption;
  note: string;

  constructor() {
    this.chairRailType = null;
    this.duraformOption = null;
  }

  update = (
    formValue: any,
    railTypes: PantryDoorChairRailTypeForList[],
    duraformOptionTypes: DuraformOptionType[]
  ) => {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.chairRailHeight = formValue.chairRailHeight;
    this.extraRailBottom = formValue.extraRailBottom;
    this.duraformEdgeProfileId = formValue.duraformEdgeProfileId;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

    const railType = railTypes.find((x) => x.id === +formValue.chairRailTypeId);
    this.chairRailType = railType;

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
