import { FormGroup } from '@angular/forms';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';

export abstract class DuraformOptionDto {
  $type: string;
  id: number;
  duraformOptionTypeId: DuraformOptionTypeKey;

  // constructor(optionType: DuraformOptionTypeDto) {
  //   this.$type = optionType.type;
  //   this.duraformOptionTypeId = optionType.id;
  // }

  abstract toFormGroup(): FormGroup;
  abstract toString(): string;
}
