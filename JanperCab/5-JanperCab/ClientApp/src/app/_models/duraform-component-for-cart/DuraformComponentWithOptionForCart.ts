import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { DuraformComponentForCart } from './DuraformComponentForCart';
import { DuraformOptionDto } from '../duraform-option/DuraformOptionDto';

export abstract class DuraformComponentWithOptionForCart extends DuraformComponentForCart {
  duraformOption: DuraformOptionDto;

  constructor() {
    super();
    this.duraformOption = null;
  }

  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    this.update(formValue);

    if (formValue.optionGroup) {
      const optionType = duraformOptionTypes.find(
        (x) => x.id === formValue.optionGroup.optionTypeId
      );

      if (!optionType) {
        throw new Error('Duraform Option Type Not Found');
      }

      this.duraformOption = DuraformOptionTypeDto.GetDuraformOptionInstance(
        optionType,
        formValue.optionGroup
      );
    } else {
      this.duraformOption = null;
    }
  }
}
