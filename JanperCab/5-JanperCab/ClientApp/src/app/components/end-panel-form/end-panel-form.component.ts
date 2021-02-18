import { DuraformOptionSelectorComponent } from './../duraform-option-selector/duraform-option-selector.component';
import { DialogService } from './../../_services/dialog.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ComponentType } from 'src/app/_enums/ComponentType';
import { DuraformComponentFormComponent } from '../duraform-component-form/duraform-component-form.component';

@Component({
  selector: 'app-end-panel-form',
  templateUrl: 'end-panel-form.component.html',
})
export class EndPanelFormComponent
  extends DuraformComponentFormComponent<DuraformEndPanelDto>
  implements OnInit {
  duraformOptionTypeKey = DuraformOptionTypeKey;
  componentType: ComponentType = ComponentType.DuraformEndPanel;

  shields = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  constructor(
    public order: DuraformOrderService,
    public ef: ElementRef,
    private fb: FormBuilder,
    public dialog: DialogService
  ) {
    super(ef, dialog);
  }

  get numberOfShields(): AbstractControl {
    return this.formGroup.get('numberOfShields');
  }

  get railLeft(): AbstractControl {
    return this.formGroup.get('railLeft');
  }

  get railCenter(): AbstractControl {
    return this.formGroup.get('railCenter');
  }

  get railRight(): AbstractControl {
    return this.formGroup.get('railRight');
  }

  get optionGroup(): AbstractControl {
    return this.formGroup.get('optionGroup');
  }

  onBasicInputBlur(): void {
    throw new Error('Method not implemented.');
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
          Validators.max(this.order.maxBoardSize),
        ],
      ],
      width: [
        null,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(this.order.maxBoardSize),
        ],
      ],
      numberOfShields: [
        2,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      railLeft: [
        56,
        [Validators.required, Validators.min(30), Validators.max(200)],
      ],
      railCenter: [
        56,
        [Validators.required, Validators.min(30), Validators.max(200)],
      ],
      railRight: [
        56,
        [Validators.required, Validators.min(30), Validators.max(200)],
      ],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      duraformEdgeProfileId: [null, [Validators.required]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.component) {
      this.formGroup.patchValue({
        ...this.component,
      });
      if (this.component.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.component.duraformOption.toFormGroup()
        );
      }

      const railCenter = this.railCenter.value;

      if (railCenter === 0) {
        this.railCenter.setValidators([Validators.required]);
        this.railCenter.updateValueAndValidity();
      }
    }
  }

  onNumberOfShieldsChanged = () => {
    const numberOfShields = this.numberOfShields.value;

    if (numberOfShields === 1) {
      this.railCenter.setValidators([Validators.required]);
      this.railCenter.patchValue(0);
      this.railCenter.updateValueAndValidity();
    } else {
      const railCenter = this.railCenter.value;

      if (railCenter === 0) {
        this.railCenter.setValidators([
          Validators.required,
          Validators.min(30),
          Validators.max(200),
        ]);
        this.railCenter.patchValue(56);
        this.railCenter.updateValueAndValidity();
      }
    }
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
            `Height must be between 30 and ${this.order.maxBoardSize}`
          );
        }
      }

      if (this.width.errors) {
        if (this.width.errors.required) {
          return this.showErrorMsg('Width cannot be empty');
        }
        if (this.width.errors.min || this.width.errors.max) {
          return this.showErrorMsg(
            `Width must be between 30 and ${this.order.maxBoardSize}`
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

    this.formSubmit.emit(this.formGroup);
  };
}
