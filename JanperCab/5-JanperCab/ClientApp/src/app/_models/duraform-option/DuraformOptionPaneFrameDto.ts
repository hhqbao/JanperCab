import { DuraformOptionDto } from './DuraformOptionDto';
import { DuraformOptionTypeDto } from './DuraformOptionTypeDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class DuraformOptionPaneFrameDto extends DuraformOptionDto {
  columns: number;
  rows: number;

  constructor(optionType: DuraformOptionTypeDto, optionValues: any) {
    super(optionType);
    this.columns = optionValues.columns;
    this.rows = optionValues.rows;
  }

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

  toString(): string {
    const panes = this.columns * this.rows;

    return `${panes} Pane Frame (${this.columns} x ${this.rows})`;
  }
}
