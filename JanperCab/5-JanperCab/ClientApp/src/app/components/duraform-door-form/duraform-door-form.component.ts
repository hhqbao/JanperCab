import { DuraformOptionSelectorComponent } from './../duraform-option-selector/duraform-option-selector.component';
import { DialogService } from './../../_services/dialog.service';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DuraformComponentFormComponent } from '../duraform-component-form/duraform-component-form.component';

@Component({
  selector: 'app-duraform-door-form',
  templateUrl: 'duraform-door-form.component.html',
})
export class DuraformDoorFormComponent
  extends DuraformComponentFormComponent<DuraformDoorDto>
  implements OnInit {
  @ViewChild('optionSelector') optionSelector: DuraformOptionSelectorComponent;

  get duraformEdgeProfileId(): AbstractControl {
    return this.formGroup.get('duraformEdgeProfileId');
  }

  get optionGroup(): AbstractControl {
    return this.formGroup.get('optionGroup');
  }

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    public fb: FormBuilder,
    ef: ElementRef,
    dialog: DialogService
  ) {
    super(ef, dialog);
  }

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

    if (this.component) {
      this.formGroup.patchValue({ ...this.component });
      if (this.component.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.component.duraformOption.toFormGroup()
        );
      }
      if (this.component.hingeHoleOption) {
        this.formGroup.addControl(
          'hingeHole',
          this.component.hingeHoleOption.toFormGroup()
        );
      }
    }
  }

  onBasicInputBlur = () => {
    if (this.optionSelector.optionForm) {
      const { optionForm } = this.optionSelector;

      optionForm.updateRequirements();
    }
  };

  onSubmit = () => {
    if (this.invalid) {
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

      if (this.optionGroup && this.optionGroup.invalid) {
        setTimeout(() => {
          (this.optionSelector.typeInput.nativeElement as HTMLElement).focus();
          return this.showErrorMsg(
            'Duraform Option Invalid! Adjust to continue.'
          );
        });
        return;
      }

      return this.showErrorMsg('Unexpected Errors');
    }

    if (!this.order.hingeHoleTypeId) {
      this.formGroup.removeControl('hingeHole');
    }

    this.formSubmit.emit(this.formGroup);
  };
}
