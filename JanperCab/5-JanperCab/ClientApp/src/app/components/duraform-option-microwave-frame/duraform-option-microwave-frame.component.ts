import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';

@Component({
  selector: 'app-duraform-option-microwave-frame',
  templateUrl: 'duraform-option-microwave-frame.component.html',
})
export class DuraformOptionMicrowaveFrameComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [
            this.typeKeyEnum.MicrowaveFrame,
            [Validators.required],
          ],
          topSize: [56, [Validators.required, Validators.min(20)]],
          bottomSize: [56, [Validators.required, Validators.min(20)]],
          leftSize: [56, [Validators.required, Validators.min(20)]],
          rightSize: [56, [Validators.required, Validators.min(20)]],
        })
      );

      this.valueChange.emit();
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

    this.valueChange.emit();
  };
}
