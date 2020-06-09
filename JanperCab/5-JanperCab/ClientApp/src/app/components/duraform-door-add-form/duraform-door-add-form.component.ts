import { DuraformDoorForCart } from './../../_models/duraform-door/DuraformDoorForCart';
import { DuraformDoorOptionForList } from './../../_models/duraform-door-option/DuraformDoorOptionForList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-duraform-door-add-form',
  templateUrl: 'duraform-door-add-form.component.html',
})
export class DuraformDoorAddFormComponent implements OnInit {
  @Input() doorOptions: DuraformDoorOptionForList[] = [];
  @Output() formSubmit = new EventEmitter<DuraformDoorForCart>();

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
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const formValue = this.formGroup.value;
    const door = new DuraformDoorForCart();
    door.quantity = formValue.quantity;
    door.height = formValue.height;
    door.width = formValue.width;
    door.top = formValue.top;
    door.bottom = formValue.bottom;
    door.left = formValue.left;
    door.right = formValue.right;
    door.note = formValue.note;

    if (formValue.optionId) {
      const option = this.doorOptions.find((x) => x.id === +formValue.optionId);
      door.duraformDoorOption = option;
    }

    this.formSubmit.emit(door);
  };
}
