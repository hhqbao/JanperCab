import { DialogService } from './../../_services/dialog.service';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
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
  selector: 'app-duraform-drawer-form',
  templateUrl: 'duraform-drawer-form.component.html',
})
export class DuraformDrawerFormComponent implements OnInit {
  @Input() duraformDrawer: DuraformDrawerDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  numberDrawers = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

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

  get drawerOne(): AbstractControl {
    return this.formGroup.get('drawerOne');
  }

  get drawerTwo(): AbstractControl {
    return this.formGroup.get('drawerTwo');
  }

  get drawerThree(): AbstractControl {
    return this.formGroup.get('drawerThree');
  }

  get drawerFour(): AbstractControl {
    return this.formGroup.get('drawerFour');
  }

  get drawerFive(): AbstractControl {
    return this.formGroup.get('drawerFive');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      numberOfDrawers: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      duraformDrawerTypeId: [null, [Validators.required]],
      height: [
        null,
        [Validators.required, Validators.min(30), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(150), Validators.max(2500)],
      ],
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      hasDrillFronts: [false],
      drawerOne: [null],
      drawerTwo: [null],
      drawerThree: [null],
      drawerFour: [null],
      drawerFive: [null],
      note: [''],
    });

    if (this.duraformDrawer) {
      this.formGroup.patchValue({ ...this.duraformDrawer });
    }
  }

  onHeightChange = () => {
    if (this.formGroup.get('height').invalid) {
      this.formGroup.get('numberOfDrawers').patchValue(null);
      this.formGroup.get('duraformDrawerTypeId').patchValue(null);
    }
  };

  onNumberOfDrawersChanged = () => {
    const numberOfDrawers = +this.formGroup.get('numberOfDrawers').value;

    this.drawerOne.clearValidators();
    this.drawerTwo.clearValidators();
    this.drawerThree.clearValidators();
    this.drawerFour.clearValidators();
    this.drawerFive.clearValidators();

    switch (numberOfDrawers) {
      case 1:
        this.drawerOne.setValidators([Validators.required]);
        this.drawerTwo.setValue(null);
        this.drawerThree.setValue(null);
        this.drawerFour.setValue(null);
        this.drawerFive.setValue(null);
        break;
      case 2:
        this.drawerOne.setValidators([Validators.required]);
        this.drawerTwo.setValidators([Validators.required]);
        this.drawerThree.setValue(null);
        this.drawerFour.setValue(null);
        this.drawerFive.setValue(null);
        break;
      case 3:
        this.drawerOne.setValidators([Validators.required]);
        this.drawerTwo.setValidators([Validators.required]);
        this.drawerThree.setValidators([Validators.required]);
        this.drawerFour.setValue(null);
        this.drawerFive.setValue(null);
        break;
      case 4:
        this.drawerOne.setValidators([Validators.required]);
        this.drawerTwo.setValidators([Validators.required]);
        this.drawerThree.setValidators([Validators.required]);
        this.drawerFour.setValidators([Validators.required]);
        this.drawerFive.setValue(null);
        break;
      case 5:
        this.drawerOne.setValidators([Validators.required]);
        this.drawerTwo.setValidators([Validators.required]);
        this.drawerThree.setValidators([Validators.required]);
        this.drawerFour.setValidators([Validators.required]);
        this.drawerFive.setValidators([Validators.required]);
        break;
      default:
        this.dialog.alert(
          'Not Supported',
          'Number of Drawers Not Supported',
          null
        );
        break;
    }

    this.drawerOne.updateValueAndValidity();
    this.drawerTwo.updateValueAndValidity();
    this.drawerThree.updateValueAndValidity();
    this.drawerFour.updateValueAndValidity();
    this.drawerFive.updateValueAndValidity();
  };

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

      if (this.drawerOne.errors && this.drawerOne.errors.required) {
        return this.showErrorMsg('Drawer One size cannot be empty');
      }

      if (this.drawerTwo.errors && this.drawerTwo.errors.required) {
        return this.showErrorMsg('Drawer Two size cannot be empty');
      }

      if (this.drawerThree.errors && this.drawerThree.errors.required) {
        return this.showErrorMsg('Drawer Three size cannot be empty');
      }

      if (this.drawerFour.errors && this.drawerFour.errors.required) {
        return this.showErrorMsg('Drawer Four size cannot be empty');
      }

      if (this.drawerFive.errors && this.drawerFive.errors.required) {
        return this.showErrorMsg('Drawer Five size cannot be empty');
      }

      return this.showErrorMsg('Unexpected Errors');
    }

    this.formSubmit.emit(this.formGroup);
  };

  private showErrorMsg(msg: string) {
    this.dialog.alert('Invalid Inputs', msg, null);
  }
}
