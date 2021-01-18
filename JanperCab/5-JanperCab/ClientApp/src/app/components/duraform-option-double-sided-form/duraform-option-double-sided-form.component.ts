import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-double-sided-form',
  templateUrl: 'duraform-option-double-sided-form.component.html',
})
export class DuraformOptionDoubleSidedFormComponent
  extends DuraformOptionBaseComponent
  implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [
            DuraformOptionTypeKey.DoubleSided,
            [Validators.required],
          ],
          hasProfile: [false],
        })
      );

      this.onChange();
    }
  }

  isValid = (): boolean => {
    return this.optionGroup.valid;
  };

  onChange = (): void => {
    this.valueChange.emit();
  };
}
