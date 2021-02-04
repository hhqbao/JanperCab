import { DuraformOptionDto } from './DuraformOptionDto';
import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';

export class DuraformOptionPaneFrameDto extends DuraformOptionDto {
  columns: number;
  rows: number;

  get hasNoProfile(): boolean {
    return false;
  }

  @Expose()
  toFormGroup(): FormGroup {
    const formGroup = new FormGroup({
      optionTypeId: new FormControl(this.duraformOptionTypeId, [
        Validators.required,
      ]),
      columns: new FormControl(this.columns, [
        Validators.required,
        Validators.min(1),
      ]),
      rows: new FormControl(this.rows, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    return formGroup;
  }

  @Expose()
  toString(): string {
    const panes = this.columns * this.rows;

    return panes === 1
      ? 'SINGLE FRAME - 1 CUT OUT'
      : `FRAME ${this.columns} x ${this.rows}`;
  }

  @Expose()
  toCabProValue(): string {
    const value = this.columns * this.rows;

    switch (value) {
      case 1:
        return 'SINGLE FRAME';
      case 4:
        return 'COLONIAL FOUR PANE';
      case 6:
        return 'COLONIAL SIX PANE';
      case 8:
        return 'COLONIAL EIGHT PANE';
      default:
        return `${this.toString()} - Not Implemented`;
    }
  }

  @Expose()
  getExtraWidth(): number {
    return 0;
  }

  @Expose()
  getExtraCharge(basePrice: number): number {
    return this.columns * this.rows * 7;
  }
}
