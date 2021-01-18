import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-pane-frame-form',
  templateUrl: 'duraform-option-pane-frame-form.component.html',
})
export class DuraformOptionPaneFrameFormComponent
  extends DuraformOptionBaseComponent
  implements OnInit {
  columns: any[];
  rows: any[];

  constructor(private fb: FormBuilder) {
    super();
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

  get columnArray(): number[] {
    const columns = this.optionGroup.get('columns').value;

    return [...Array(columns).keys()];
  }

  get rowArray(): number[] {
    const rows = this.optionGroup.get('rows').value;

    return [...Array(rows).keys()];
  }

  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [
            DuraformOptionTypeKey.PaneFrame,
            [Validators.required],
          ],
          columns: [1, [Validators.required, Validators.min(1)]],
          rows: [1, [Validators.required, Validators.min(1)]],
        })
      );

      this.onChange();
    }
  }

  isValid = (): boolean => {
    return this.optionGroup.valid;
  };

  onChange = () => {
    this.valueChange.emit();
  };
}
