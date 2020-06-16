import { DuraformOption } from './DuraformOption';
import { DuraformOptionType } from './DuraformOptionType';
import { FormGroup } from '@angular/forms';

export class DuraformOptionPaneFrame extends DuraformOption {
  numberOfPanes: number;

  constructor(optionType: DuraformOptionType, optionValues: any) {
    super(optionType);
  }

  toFormGroup(): FormGroup {
    throw new Error('Method not implemented.');
  }

  toString(): string {
    return `${
      this.numberOfPanes === 1 ? 'Single' : this.numberOfPanes
    } Pane Frame`;
  }
}
