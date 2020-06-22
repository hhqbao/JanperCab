import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';

@Component({
  selector: 'app-duraform-option-pane-frame-form',
  templateUrl: 'duraform-option-pane-frame-form.component.html',
})
export class DuraformOptionPaneFrameFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;
  columns: any[];
  rows: any[];

  constructor(private fb: FormBuilder) {
    this.columns = [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
    ];
    this.rows = [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
      { text: '4', value: 4 },
      { text: '5', value: 5 },
      { text: '6', value: 6 },
    ];
  }

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [this.typeKeyEnum.PaneFrame, [Validators.required]],
          columns: [1, [Validators.required, Validators.min(1)]],
          rows: [1, [Validators.required, Validators.min(1)]],
        })
      );

      this.valueChange.emit();
    }
  }

  get columnArray(): number[] {
    const columns = this.formGroup.get('optionGroup').get('columns').value;

    return [...Array(columns).keys()];
  }

  get rowArray(): number[] {
    const rows = this.formGroup.get('optionGroup').get('rows').value;

    return [...Array(rows).keys()];
  }

  onValueChange = () => {
    this.valueChange.emit();
  };
}
