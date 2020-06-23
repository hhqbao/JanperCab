import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { PantryDoorForCart } from '../../_models/pantry-door/PantryDoorForCart';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pantry-door-form',
  templateUrl: 'pantry-door-form.component.html',
})
export class PantryDoorFormComponent implements OnInit {
  @Input() pantryDoor: PantryDoorForCart = null;

  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;
  optionTypeKeyEnum = DuraformOptionTypeKey;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder
  ) {}

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
        [Validators.required, Validators.min(50), Validators.max(1200)],
      ],
      chairRailHeight: [
        56,
        [Validators.required, Validators.min(30), Validators.max(100)],
      ],
      chairRailTypeId: [
        this.asset.pantryDoorChairRailTypes[0]?.id,
        [Validators.required],
      ],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
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
      if (this.pantryDoor.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.pantryDoor.duraformOption.toFormGroup()
        );
      }
    }
  }

  get chairRailHeight(): AbstractControl {
    return this.formGroup.get('chairRailHeight');
  }

  onSubmit = () => {
    const formValue = this.formGroup.value;

    if (formValue.extraRailBottom === 0) {
      this.formGroup.patchValue({ extraRailBottom: null });
    }

    this.formSubmit.emit(this.formGroup);
  };
}
