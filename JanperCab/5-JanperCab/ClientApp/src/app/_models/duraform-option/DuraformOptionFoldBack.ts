import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';
import { DuraformOption } from './DuraformOption';
import { FormGroup } from '@angular/forms';

export class DuraformOptionFoldBack extends DuraformOption {
  hasProfile: boolean;
  length: number;
  thickness: number;
  hasDoubleReturn: boolean;

  constructor(optionType: DuraformOptionType, optionValues: any) {
    super(optionType);
    this.hasProfile = optionValues.hasProfile;
    this.length = optionValues.length;
    this.thickness = optionValues.thickness;
    this.hasDoubleReturn = optionValues.hasDoubleReturn;
  }

  toFormGroup(): FormGroup {
    throw new Error('Method not implemented.');
  }

  toString(): string {
    let value = `FOLD BACK - ${
      this.hasProfile ? 'With Profile' : 'No Face Route'
    } - `;
    value += `${this.length}mm - ${this.thickness}mm - `;
    value += `${this.hasDoubleReturn ? 'Double' : 'Single'}`;

    return value;
  }
}
