import { DialogService } from './../../_services/dialog.service';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door-form',
  templateUrl: 'duraform-door-form.component.html',
})
export class DuraformDoorFormComponent implements OnInit {
  @Input() door: DuraformDoorDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

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

  get duraformEdgeProfileId(): AbstractControl {
    return this.formGroup.get('duraformEdgeProfileId');
  }

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      height: [
        null,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(this.order.isRoutingOnly ? 3600 : 2500),
        ],
      ],
      width: [
        null,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(this.order.isRoutingOnly ? 3600 : 2500),
        ],
      ],
      duraformEdgeProfileId: [null, [Validators.required]],
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
      if (this.door.hingeHoleOption) {
        this.formGroup.addControl(
          'hingeHole',
          this.door.hingeHoleOption.toFormGroup()
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

      return this.showErrorMsg('Unexpected Errors');
    }

    if (!this.order.hingeHoleTypeId) {
      this.formGroup.removeControl('hingeHole');
    }

    this.formSubmit.emit(this.formGroup);
  };

  private showErrorMsg(msg: string) {
    this.dialog.alert('Invalid Inputs', msg, null);
  }
}
