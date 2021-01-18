import { DialogService } from './../../_services/dialog.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ComponentType } from 'src/app/_enums/ComponentType';

@Component({
  selector: 'app-end-panel-form',
  templateUrl: 'end-panel-form.component.html',
})
export class EndPanelFormComponent implements OnInit {
  @Input() endPanel: DuraformEndPanelDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  duraformOptionTypeKey = DuraformOptionTypeKey;
  formGroup: FormGroup;
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

    if (this.endPanel) {
      this.formGroup.patchValue({
        ...this.endPanel,
      });
      if (this.endPanel.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.endPanel.duraformOption.toFormGroup()
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

    this.formSubmit.emit(this.formGroup);
  };

  private showErrorMsg(msg: string) {
    this.dialog.alert('Invalid Inputs', msg, null);
  }
}
