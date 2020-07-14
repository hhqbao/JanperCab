import { DuraformOptionDto } from './DuraformOptionDto';
import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expose } from 'class-transformer';

export class DuraformOptionPaneFrameDto extends DuraformOptionDto {
  columns: number;
  rows: number;

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

    return `${panes} Pane Frame (${this.columns} x ${this.rows})`;
  }
}
