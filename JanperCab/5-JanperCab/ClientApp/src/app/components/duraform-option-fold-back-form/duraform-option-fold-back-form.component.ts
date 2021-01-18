import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { FoldingType } from './../../_enums/FoldingType';
import { DialogService } from './../../_services/dialog.service';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-fold-back-form',
  templateUrl: 'duraform-option-fold-back-form.component.html',
})
export class DuraformOptionFoldBackFormComponent
  extends DuraformOptionBaseComponent
  implements OnInit {
  readonly foldingType = FoldingType;

  thicknesses: any[];
  foldBackTypes: any[];

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private asset: DuraformAssetService,
    private order: DuraformOrderService
  ) {
    super();

    this.thicknesses = [
      { text: '18mm', value: 18 },
      { text: '36mm', value: 36 },
    ];
    this.foldBackTypes = [
      { text: 'Left Return', value: FoldingType.Left },
      { text: 'Right Return', value: FoldingType.Right },
      { text: 'Double Return', value: FoldingType.Double },
    ];
  }

  get leftLength(): AbstractControl {
    return this.optionGroup.get('leftLength');
  }

  get rightLength(): AbstractControl {
    return this.optionGroup.get('rightLength');
  }

  get selectedFoldingType(): FoldingType {
    return this.optionGroup.get('foldingType').value;
  }

  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [DuraformOptionTypeKey.FoldBack, [Validators.required]],
          hasProfile: [false],
          thickness: [18, [Validators.required]],
          foldingType: [FoldingType.Left, [Validators.required]],
          leftLength: [
            100,
            [Validators.required, Validators.min(100), Validators.max(500)],
          ],
          rightLength: [0, []],
        })
      );

      this.formGroup.get('top').setValue(true);
      this.formGroup.get('bottom').setValue(true);
      this.formGroup.get('left').setValue(true);
      this.formGroup.get('right').setValue(true);

      const edgeProfile = this.asset
        .getAllowedEdgeProfiles(this.order.selectedDesign)
        .filter(
          (x) => x.forceTop && x.forceBottom && x.forceLeft && x.forceRight
        )[0];

      this.formGroup
        .get('duraformEdgeProfileId')
        .setValue(edgeProfile ? edgeProfile.id : null);

      this.onChange();
    }
  }

  onSelectFoldingType = () => {
    switch (this.selectedFoldingType) {
      case FoldingType.Left:
        this.leftLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(500),
        ]);
        this.leftLength.setValue(100);

        this.rightLength.setValue(0);
        this.rightLength.clearValidators();
        break;
      case FoldingType.Right:
        this.rightLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(500),
        ]);
        this.rightLength.setValue(100);

        this.leftLength.setValue(0);
        this.leftLength.clearValidators();
        break;
      case FoldingType.Double:
        this.leftLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(500),
        ]);
        this.rightLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(500),
        ]);

        this.leftLength.setValue(100);
        this.rightLength.setValue(100);
        break;
    }

    this.leftLength.updateValueAndValidity();
    this.rightLength.updateValueAndValidity();
    this.onChange();
  };

  onReturnLengthTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.onReturnLengthBlur();
    }
  };

  onReturnLengthBlur = () => {
    const foldingType = this.optionGroup.get('foldingType')
      .value as FoldingType;

    let lengthControls: AbstractControl[] = [];

    switch (foldingType) {
      case FoldingType.Left:
        lengthControls = [this.optionGroup.get('leftLength')];
        break;
      case FoldingType.Right:
        lengthControls = [this.optionGroup.get('rightLength')];
        break;
      case FoldingType.Double:
        lengthControls.push(this.optionGroup.get('leftLength'));
        lengthControls.push(this.optionGroup.get('rightLength'));
        break;
    }

    lengthControls = lengthControls.filter((x) => x.invalid);

    for (const control of lengthControls) {
      control.setValue(100);
    }

    if (lengthControls.length > 0) {
      this.dialog.alert(
        'Invalid Return Length',
        'Return length must be between 100mm and 500mm',
        null
      );
    }

    this.onChange();
  };

  isValid = (): boolean => {
    return this.optionGroup.valid;
  };

  onChange = (): void => {
    this.valueChange.emit();
  };
}
