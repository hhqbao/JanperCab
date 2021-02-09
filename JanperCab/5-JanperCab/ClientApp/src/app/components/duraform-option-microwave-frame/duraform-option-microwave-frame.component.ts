import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-microwave-frame',
  templateUrl: 'duraform-option-microwave-frame.component.html',
})
export class DuraformOptionMicrowaveFrameComponent
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
            DuraformOptionTypeKey.MicrowaveFrame,
            [Validators.required],
          ],
          topSize: [56, [Validators.required, Validators.min(20)]],
          bottomSize: [56, [Validators.required, Validators.min(20)]],
          leftSize: [56, [Validators.required, Validators.min(20)]],
          rightSize: [56, [Validators.required, Validators.min(20)]],
        })
      );

      this.onChange();
    }
  }

  onTab = ({ event, control }) => {
    const innerEvent = event as KeyboardEvent;
    const innerControl = control as AbstractControl;

    if (innerEvent.key === 'Enter' || innerEvent.key === 'Tab') {
      this.onBlur(innerControl);
    }
  };

  onBlur = (control: AbstractControl) => {
    if (control.invalid) {
      control.setValue(56);
    }

    this.onChange();
  };

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
