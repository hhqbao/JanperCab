import { FormGroup } from '@angular/forms';
import { DuraformOptionNoFace } from './DuraformOptionNoFace';
import { DuraformOptionType } from './DuraformOptionType';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOptionDoubleSided } from './DuraformOptionDoubleSided';

export abstract class DuraformOption {
  $type: string;
  id: number;
  duraformOptionTypeId: DuraformOptionTypeKey;

  constructor(optionType: DuraformOptionType) {
    this.$type = optionType.type;
    this.duraformOptionTypeId = optionType.id;
  }

  abstract toFormGroup(): FormGroup;
  abstract toString(): string;
}
