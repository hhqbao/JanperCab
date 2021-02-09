import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-no-face',
  templateUrl: 'duraform-option-no-face.component.html',
})
export class DuraformOptionNoFaceComponent
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
            DuraformOptionTypeKey.NoFaceRoute,
            [Validators.required],
          ],
        })
      );

      this.onChange();
    }
  }

  isValid = (): boolean => {
    return this.optionGroup.valid;
  };

  updateRequirements(): void {
    return;
  }

  onChange = (): void => {
    this.valueChange.emit();
  };
}
