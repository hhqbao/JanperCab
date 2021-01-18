import { DuraformOrderService } from './../../_services/duraform-order.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOptionBaseComponent } from '../duraform-option-base-component/duraform-option-base.component';

@Component({
  selector: 'app-duraform-option-angled-shelf-form',
  templateUrl: 'duraform-option-angled-shelf-form.component.html',
})
export class DuraformOptionAngledShelfFormComponent
  extends DuraformOptionBaseComponent
  implements OnInit {
  readonly finishStyles: any[] = [
    { text: 'SINGLE SIDED', value: false },
    { text: 'DOUBLE SIDED', value: true },
  ];

  constructor(
    private fb: FormBuilder,
    private asset: DuraformAssetService,
    private order: DuraformOrderService
  ) {
    super();
  }

  get boxDrawing() {
    const height = this.formGroup.get('height').value;
    const width = this.formGroup.get('width').value;
    const sideOneValue = this.optionGroup.get('sideOne').value;
    const sideTwoValue = this.optionGroup.get('sideTwo').value;

    const boxHeight = 250;
    const offset = height / width;
    const boxWidth = boxHeight / offset;

    const offsetWidth = width / boxWidth;
    const sideTwoBox = sideTwoValue / offsetWidth;

    const offsetHeight = height / boxHeight;
    const sideOneBox = sideOneValue / offsetHeight;

    return {
      height: `${boxHeight}px`,
      width: `${boxWidth}px`,
      'clip-path': `polygon(0 0, ${(sideTwoBox * 100) / boxWidth}% 0, 100% ${
        100 - (sideOneBox * 100) / boxHeight
      }%, 100% 100%, 0 100%)`,
    };
  }

  get sideOneControl(): AbstractControl {
    return this.optionGroup.get('sideOne');
  }

  get sideTwoControl(): AbstractControl {
    return this.optionGroup.get('sideTwo');
  }

  ngOnInit() {
    if (!this.optionGroup) {
      const height = this.formGroup.get('height').value;
      const width = this.formGroup.get('width').value;

      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [
            DuraformOptionTypeKey.AngledShelf,
            [Validators.required],
          ],
          sideOne: [
            Math.ceil(height / 2),
            [Validators.required, Validators.min(30), Validators.max(height)],
          ],
          sideTwo: [
            Math.ceil(width / 2),
            [Validators.required, Validators.min(30), Validators.max(width)],
          ],
          isDoubleSided: [false],
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

      this.valueChange.emit();
    }
  }

  onSideLengthTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.onSideLengthBlur();
    }
  };

  onSideLengthBlur = () => {
    const optionGroup = this.optionGroup;

    if (optionGroup.invalid) {
      const height = this.formGroup.get('height').value;
      const width = this.formGroup.get('width').value;

      if (optionGroup.get('sideOne').invalid) {
        optionGroup.get('sideOne').patchValue(Math.ceil(height / 2));
      }

      if (optionGroup.get('sideTwo').invalid) {
        optionGroup.get('sideTwo').patchValue(Math.ceil(width / 2));
      }
    }

    this.onChange();
  };

  isValid = (): boolean => {
    const heightControl = this.formGroup.get('height');
    const widthControl = this.formGroup.get('width');

    if (heightControl.invalid || widthControl.invalid) return false;

    this.optionGroup
      .get('sideOne')
      .setValidators([
        Validators.required,
        Validators.min(30),
        Validators.max(heightControl.value),
      ]);
    this.optionGroup
      .get('sideTwo')
      .setValidators([
        Validators.required,
        Validators.min(30),
        Validators.max(widthControl.value),
      ]);

    if (this.sideOneControl.invalid || this.sideTwoControl.invalid)
      return false;

    const height = heightControl.value;
    const width = widthControl.value;

    if (height < this.sideOneControl.value || width < this.sideTwoControl.value)
      return false;

    return true;
  };

  onChange = () => {
    this.valueChange.emit();
  };
}
