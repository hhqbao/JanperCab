import { FormGroup } from '@angular/forms';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';

export abstract class DuraformOptionDto {
  $type: string;
  id: number;
  duraformOptionTypeId: DuraformOptionTypeKey;

  abstract get hasNoProfile(): boolean;

  abstract getExtraWidth(): number;
  abstract getExtraCharge(basePrice: number): number;

  abstract toFormGroup(): FormGroup;
  abstract toString(): string;
  abstract toCabProValue(): string;
}
