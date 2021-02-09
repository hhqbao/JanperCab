import { ComponentType } from './../../_enums/ComponentType';
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
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DuraformOptionSelectorComponent } from '../duraform-option-selector/duraform-option-selector.component';
import { DuraformComponentFormComponent } from '../duraform-component-form/duraform-component-form.component';

@Component({
  selector: 'app-pantry-door-form',
  templateUrl: 'pantry-door-form.component.html',
})
export class PantryDoorFormComponent
  extends DuraformComponentFormComponent<DuraformPantryDoorDto>
  implements OnInit {
  @ViewChild('optionSelector') optionSelector: DuraformOptionSelectorComponent;

  optionTypeKeyEnum = DuraformOptionTypeKey;
  componentType: ComponentType = ComponentType.DuraformPantryDoor;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder,
    ef: ElementRef,
    dialog: DialogService
  ) {
    super(ef, dialog);
  }

  get chairRailHeight(): AbstractControl {
    return this.formGroup.get('chairRailHeight');
  }

  get optionGroup(): AbstractControl {
    return this.formGroup.get('optionGroup');
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

  onBasicInputBlur(): void {
    throw new Error('Method not implemented.');
  }

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

    const formValue = this.formGroup.value;

    if (formValue.extraRailBottom === 0) {
      this.formGroup.patchValue({ extraRailBottom: null });
    }

    if (!this.order.hingeHoleTypeId) {
      this.formGroup.removeControl('hingeHole');
    }

    this.formSubmit.emit(this.formGroup);
  };
}
