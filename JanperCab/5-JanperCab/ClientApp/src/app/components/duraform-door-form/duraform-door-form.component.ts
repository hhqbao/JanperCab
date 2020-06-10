import { DuraformDoorForCart } from '../../_models/duraform-door/DuraformDoorForCart';
import { DuraformDoorOptionForList } from '../../_models/duraform-door-option/DuraformDoorOptionForList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door-form',
  templateUrl: 'duraform-door-form.component.html',
})
export class DuraformDoorFormComponent implements OnInit {
  @Input() door: DuraformDoorForCart;
  @Input() doorOptions: DuraformDoorOptionForList[] = [];
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
      optionId: [null],
      note: [''],
    });

    if (this.door) {
      this.formGroup.patchValue({ ...this.door });
      this.formGroup.patchValue({
        optionId: this.door.duraformDoorOption
          ? this.door.duraformDoorOption.id
          : null,
      });
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
