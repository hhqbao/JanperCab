import { DuraformDoorForCart } from '../../_models/duraform-door/DuraformDoorForCart';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';

@Component({
  selector: 'app-duraform-door-form',
  templateUrl: 'duraform-door-form.component.html',
})
export class DuraformDoorFormComponent implements OnInit {
  @Input() door: DuraformDoorForCart;
  @Input() duraformOptionTypes: DuraformOptionType[] = [];
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.door) {
      this.formGroup.patchValue({ ...this.door });
      if (this.door.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.door.duraformOption.toFormGroup()
        );
      }
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
