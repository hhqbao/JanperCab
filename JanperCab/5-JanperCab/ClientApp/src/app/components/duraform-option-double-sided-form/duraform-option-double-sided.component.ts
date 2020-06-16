import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-option-double-sided-form',
  templateUrl: 'duraform-option-double-sided-form.component.html',
})
export class DuraformOptionDoubleSidedFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [this.typeKeyEnum.DoubleSided, [Validators.required]],
          hasProfile: [false],
        })
      );

      this.valueChange.emit();
    }
  }

  onChange = () => {
    this.valueChange.emit();
  };
}
