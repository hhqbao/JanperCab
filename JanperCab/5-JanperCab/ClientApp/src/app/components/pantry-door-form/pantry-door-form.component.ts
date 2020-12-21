import { DialogService } from './../../_services/dialog.service';
import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
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
  @Input() pantryDoor: DuraformPantryDoorDto;

  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;
  optionTypeKeyEnum = DuraformOptionTypeKey;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) {}

  get invalid(): boolean {
    return this.formGroup.invalid;
  }

  get quantity(): AbstractControl {
    return this.formGroup.get('quantity');
  }

  get height(): AbstractControl {
    return this.formGroup.get('height');
  }

  get width(): AbstractControl {
    return this.formGroup.get('width');
  }

  get chairRailHeight(): AbstractControl {
    return this.formGroup.get('chairRailHeight');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(30), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(30), Validators.max(2500)],
      ],
      chairRailHeight: [
        null,
        [Validators.required, Validators.min(30), Validators.max(2500)],
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

      if (this.pantryDoor.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.pantryDoor.duraformOption.toFormGroup()
        );
      }
      if (this.pantryDoor.hingeHoleOption) {
        this.formGroup.addControl(
          'hingeHole',
          this.pantryDoor.hingeHoleOption.toFormGroup()
        );
      }
    }
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      if (this.quantity.errors) {
        if (this.quantity.errors.required) {
          return this.showErrorMsg('Quantity cannot be empty');
        }
        if (this.quantity.errors.min || this.quantity.errors.max) {
          return this.showErrorMsg('Quantity must be between 1 and 100');
        }
      }

      if (this.height.errors) {
        if (this.height.errors.required) {
          return this.showErrorMsg('Height cannot be empty');
        }
        if (this.height.errors.min || this.height.errors.max) {
          return this.showErrorMsg(
            `Height must be between 30 and ${
              this.order.isRoutingOnly ? 3600 : 2500
            }`
          );
        }
      }

      if (this.width.errors) {
        if (this.width.errors.required) {
          return this.showErrorMsg('Width cannot be empty');
        }
        if (this.width.errors.min || this.width.errors.max) {
          return this.showErrorMsg(
            `Width must be between 30 and ${
              this.order.isRoutingOnly ? 3600 : 2500
            }`
          );
        }
      }

      if (this.chairRailHeight.errors) {
        if (this.chairRailHeight.errors.required) {
          return this.showErrorMsg('Rail Height cannot be empty');
        }
        if (
          this.chairRailHeight.errors.min ||
          this.chairRailHeight.errors.max
        ) {
          return this.showErrorMsg(
            `Rail Height must be between 30 and ${
              this.order.isRoutingOnly ? 3600 : 2500
            }`
          );
        }
      }

      return this.showErrorMsg('Unexpected Errors');
    }

    const formValue = this.formGroup.value;

    if (formValue.extraRailBottom === 0) {
      this.formGroup.patchValue({ extraRailBottom: null });
    }

    if (!this.order.hingeHoleTypeId) {
      this.formGroup.removeControl('hingeHole');
    }

    this.formSubmit.emit(this.formGroup);
  };

  showErrorMsg = (msg: string) => {
    this.dialog.alert('Invalid Inputs', msg, null);
  };
}
