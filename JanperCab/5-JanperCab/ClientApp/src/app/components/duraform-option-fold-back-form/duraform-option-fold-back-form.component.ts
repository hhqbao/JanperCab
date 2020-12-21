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

@Component({
  selector: 'app-duraform-option-fold-back-form',
  templateUrl: 'duraform-option-fold-back-form.component.html',
})
export class DuraformOptionFoldBackFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;
  readonly foldingType = FoldingType;

  thicknesses: any[];
  foldBackTypes: any[];

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private asset: DuraformAssetService,
    private order: DuraformOrderService
  ) {
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
    return this.formGroup.get('optionGroup').get('leftLength');
  }

  get rightLength(): AbstractControl {
    return this.formGroup.get('optionGroup').get('rightLength');
  }

  get selectedFoldingType(): FoldingType {
    return this.formGroup.get('optionGroup').get('foldingType').value;
  }

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [this.typeKeyEnum.FoldBack, [Validators.required]],
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

      const edgeProfile = this.asset.edgeProfiles.filter(
        (x) => x.forcedValuePerItem === true
      )[0];

      this.formGroup
        .get('duraformEdgeProfileId')
        .setValue(
          edgeProfile ? edgeProfile.id : this.order.selectedEdgeProfile.id
        );

      this.valueChange.emit();
    }
  }

  onValueChange = () => {
    this.valueChange.emit();
  };

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
    this.onValueChange();
  };

  onReturnLengthTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.onReturnLengthBlur();
    }
  };

  onReturnLengthBlur = () => {
    const foldingType = this.formGroup.get('optionGroup').get('foldingType')
      .value as FoldingType;

    let lengthControls: AbstractControl[] = [];

    switch (foldingType) {
      case FoldingType.Left:
        lengthControls = [this.formGroup.get('optionGroup').get('leftLength')];
        break;
      case FoldingType.Right:
        lengthControls = [this.formGroup.get('optionGroup').get('rightLength')];
        break;
      case FoldingType.Double:
        lengthControls.push(
          this.formGroup.get('optionGroup').get('leftLength')
        );
        lengthControls.push(
          this.formGroup.get('optionGroup').get('rightLength')
        );
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

    this.onValueChange();
  };
}
