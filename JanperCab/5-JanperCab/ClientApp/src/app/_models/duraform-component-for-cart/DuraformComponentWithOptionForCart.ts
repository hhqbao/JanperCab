import { DuraformOptionType } from './../duraform-option/DuraformOptionType';
import { DuraformComponentForCart } from './DuraformComponentForCart';
import { DuraformOption } from '../duraform-option/DuraformOption';

export abstract class DuraformComponentWithOptionForCart extends DuraformComponentForCart {
  duraformOption: DuraformOption;

  constructor() {
    super();
    this.duraformOption = null;
  }

  updateWithOption(formValue: any, duraformOptionTypes: DuraformOptionType[]) {
    this.update(formValue);

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
  }
}
