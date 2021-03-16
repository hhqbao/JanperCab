import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { FoldingType } from './../../_enums/FoldingType';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

  get allowedSize(): number {
    const width = this.formGroup.get('width').value;

    return this.order.maxBoardSize - width;
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
          leftLength: [0, []],
          rightLength: [0, []],
        })
      );

      this.formGroup.get('top').setValue(true);
      this.formGroup.get('bottom').setValue(true);
      this.formGroup.get('left').setValue(true);
      this.formGroup.get('right').setValue(true);

      const edgeProfile = this.asset
        .getAllowedEdgeProfiles(this.order.duraformEnquiry.duraformDesign)
        .filter(
          (x) => x.forceTop && x.forceBottom && x.forceLeft && x.forceRight
        )[0];

      this.formGroup
        .get('duraformEdgeProfileId')
        .setValue(edgeProfile ? edgeProfile.id : null);

      this.onSelectFoldingType();
    }
  }

  onSelectFoldingType = () => {
    this.leftLength.setValue(0);
    this.rightLength.setValue(0);

    this.leftLength.setValidators([
      Validators.required,
      Validators.min(100),
      Validators.max(this.allowedSize),
    ]);

    this.rightLength.setValidators([
      Validators.required,
      Validators.min(100),
      Validators.max(this.allowedSize),
    ]);

    switch (this.selectedFoldingType) {
      case FoldingType.Left:
        this.rightLength.clearValidators();
        break;
      case FoldingType.Right:
        this.leftLength.clearValidators();
        break;
      case FoldingType.Double:
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
    switch (this.selectedFoldingType) {
      case FoldingType.Double:
        this.leftLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(this.allowedSize - this.rightLength.value),
        ]);
        this.rightLength.setValidators([
          Validators.required,
          Validators.min(100),
          Validators.max(this.allowedSize - this.leftLength.value),
        ]);
        break;
    }

    this.leftLength.updateValueAndValidity();
    this.rightLength.updateValueAndValidity();

    if (this.optionGroup.valid) {
      this.onChange();
    }
  };

  updateRequirements(): void {
    const leftSize = this.leftLength.value;
    const rightSize = this.rightLength.value;

    if (leftSize + rightSize > this.allowedSize) {
      this.leftLength.patchValue(0);
      this.rightLength.patchValue(0);

      this.leftLength.setValidators([
        Validators.required,
        Validators.min(100),
        Validators.max(this.allowedSize),
      ]);
      this.rightLength.setValidators([
        Validators.required,
        Validators.min(100),
        Validators.max(this.allowedSize),
      ]);

      switch (this.selectedFoldingType) {
        case FoldingType.Double:
          break;
        case FoldingType.Left:
          this.rightLength.clearValidators();
          break;
        case FoldingType.Right:
          this.leftLength.clearValidators();
          break;
      }

      this.leftLength.updateValueAndValidity();
      this.rightLength.updateValueAndValidity();
    }
  }

  onChange = (): void => {
    this.valueChange.emit();
  };
}
