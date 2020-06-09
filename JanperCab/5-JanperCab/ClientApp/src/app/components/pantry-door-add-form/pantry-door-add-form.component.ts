import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { PantryDoorForCart } from './../../_models/pantry-door/PantryDoorForCart';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pantry-door-add-form',
  templateUrl: 'pantry-door-add-form.component.html',
})
export class PantryDoorAddFormComponent implements OnInit {
  @Input() pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  @Output() formSubmit = new EventEmitter<PantryDoorForCart>();

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
      chairRailHeight: [
        null,
        [Validators.required, Validators.min(50), Validators.max(500)],
      ],
      chairRailTypeId: [
        this.pantryDoorChairRailTypes[0]
          ? this.pantryDoorChairRailTypes[0].id
          : null,
        Validators.required,
      ],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const formValue = this.formGroup.value;

    const pantryDoor = new PantryDoorForCart();
    pantryDoor.quantity = formValue.quantity;
    pantryDoor.height = formValue.height;
    pantryDoor.width = formValue.width;
    pantryDoor.chairRailHeight = formValue.chairRailHeight;
    pantryDoor.extraRailBottom =
      formValue.extraRailBottom === 0 ? null : formValue.extraRailBottom;
    pantryDoor.top = formValue.top;
    pantryDoor.bottom = formValue.bottom;
    pantryDoor.left = formValue.left;
    pantryDoor.right = formValue.right;
    pantryDoor.note = formValue.note;

    const railType = this.pantryDoorChairRailTypes.find(
      (x) => x.id === +formValue.chairRailTypeId
    );
    pantryDoor.chairRailType = railType;

    if (formValue.extraRailBottom === 0) {
      this.formGroup.patchValue({ extraRailBottom: null });
    }
    this.formSubmit.emit(pantryDoor);
  };
}
