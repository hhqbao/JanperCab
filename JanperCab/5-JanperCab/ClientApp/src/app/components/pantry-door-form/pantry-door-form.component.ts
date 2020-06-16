import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { PantryDoorForCart } from '../../_models/pantry-door/PantryDoorForCart';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-pantry-door-form',
  templateUrl: 'pantry-door-form.component.html',
})
export class PantryDoorFormComponent implements OnInit {
  @Input() pantryDoor: PantryDoorForCart = null;
  @Input() pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];

  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private ef: ElementRef) {}

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
        [Validators.required, Validators.min(50), Validators.max(2500)],
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

    if (this.pantryDoor) {
      this.formGroup.patchValue({ ...this.pantryDoor });
      this.formGroup.patchValue({
        chairRailTypeId: this.pantryDoor.chairRailType.id,
      });
    }
  }

  onSubmit = () => {
    const formValue = this.formGroup.value;

    if (formValue.extraRailBottom === 0) {
      this.formGroup.patchValue({ extraRailBottom: null });
    }

    this.formSubmit.emit(this.formGroup);
  };
}
