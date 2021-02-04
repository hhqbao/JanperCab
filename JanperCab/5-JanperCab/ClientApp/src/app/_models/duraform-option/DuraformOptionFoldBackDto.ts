import { FoldingType } from './../../_enums/FoldingType';
import { DuraformOptionDto } from './DuraformOptionDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';

export class DuraformOptionFoldBackDto extends DuraformOptionDto {
  hasProfile: boolean;
  thickness: number;
  foldingType: FoldingType;
  leftLength: number;
  rightLength: number;

  get hasNoProfile(): boolean {
    return !this.hasProfile;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      hasProfile: new FormControl(this.hasProfile),
      thickness: new FormControl(this.thickness, [Validators.required]),
      foldingType: new FormControl(this.foldingType, [Validators.required]),
      leftLength: new FormControl(this.leftLength, []),
      rightLength: new FormControl(this.rightLength, []),
    });

    switch (this.foldingType) {
      case FoldingType.Left:
        formGroup.get('rightLength').clearValidators();
        formGroup
          .get('leftLength')
          .setValidators([
            Validators.required,
            Validators.min(100),
            Validators.max(500),
          ]);
        break;
      case FoldingType.Right:
        formGroup.get('leftLength').clearValidators();
        formGroup
          .get('rightLength')
          .setValidators([
            Validators.required,
            Validators.min(100),
            Validators.max(500),
          ]);
        break;
      case FoldingType.Double:
        formGroup
          .get('leftLength')
          .setValidators([
            Validators.required,
            Validators.min(100),
            Validators.max(500),
          ]);
        formGroup
          .get('rightLength')
          .setValidators([
            Validators.required,
            Validators.min(100),
            Validators.max(500),
          ]);
        break;
    }

    return formGroup;
  }

  @Expose()
  toString(): string {
    let value = 'FOLD ';

    switch (this.foldingType) {
      case FoldingType.Left:
        value += `${this.leftLength}L`;
        break;
      case FoldingType.Right:
        value += `${this.rightLength}R`;
        break;
      case FoldingType.Double:
        value += `${this.leftLength}L x ${this.rightLength}R`;
        break;
    }

    value += ` ${this.thickness}mm`;
    value += `${this.hasProfile ? '' : ' End Panel'}`;

    return value;
  }

  @Expose()
  toCabProValue(): string {
    const highestValue =
      this.leftLength >= this.rightLength ? this.leftLength : this.rightLength;

    const roundValue = Math.ceil(highestValue / 100) * 100;

    let stringValue = `${roundValue}mm`;
    stringValue += this.foldingType === FoldingType.Double ? ' DOUBLE' : '';
    stringValue += ' RETURN END PANEL';

    return stringValue;
  }

  @Expose()
  getExtraWidth(): number {
    return this.leftLength + this.rightLength + this.thickness;
  }

  @Expose()
  getExtraCharge(basePrice: number): number {
    let extraPrice = (basePrice * 5) / 100;

    const perFold = 20;

    extraPrice +=
      this.foldingType === FoldingType.Double ? perFold * 2 : perFold;

    return extraPrice;
  }
}
