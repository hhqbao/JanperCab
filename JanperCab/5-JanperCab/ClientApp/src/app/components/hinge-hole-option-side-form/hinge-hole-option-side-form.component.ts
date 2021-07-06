import { HingeHoleOptionBaseForm } from './../hinge-hole-option-base-form/hinge-hole-option-base-form';
import { HingeHoleDirectionEnum } from './../../_enums/HingeHoleDirectionEnum';
import { HingeHoleOptionSideDto } from './../../_models/hinge-hole-option/HingeHoleOptionSideDto';
import { AbstractControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-hinge-hole-option-side-form',
  templateUrl: 'hinge-hole-option-side-form.component.html',
})
export class HingeHoleOptionSideFormComponent
  extends HingeHoleOptionBaseForm
  implements OnInit
{
  @ViewChild('topInput') topInput: ElementRef;
  @ViewChild('topCenterInput') topCenterInput: ElementRef;
  @ViewChild('middleOneInput') middleOneInput: ElementRef;
  @ViewChild('bottomCenterInput') bottomCenterInput: ElementRef;
  @ViewChild('bottomInput') bottomInput: ElementRef;

  quantities = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
  ];

  directions = [
    { text: 'Left', value: HingeHoleDirectionEnum.Left },
    { text: 'Right', value: HingeHoleDirectionEnum.Right },
    { text: 'Pair', value: HingeHoleDirectionEnum.Pair },
  ];

  get direction(): AbstractControl {
    return this.optionGroup?.get('direction');
  }

  get quantity(): AbstractControl {
    return this.optionGroup?.get('quantity');
  }

  get top(): AbstractControl {
    return this.optionGroup?.get('top');
  }

  get topCenter(): AbstractControl {
    return this.optionGroup?.get('topCenter');
  }

  get middleOne(): AbstractControl {
    return this.optionGroup?.get('middleOne');
  }

  get bottomCenter(): AbstractControl {
    return this.optionGroup?.get('bottomCenter');
  }

  get bottom(): AbstractControl {
    return this.optionGroup?.get('bottom');
  }

  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'hingeHole',
        new HingeHoleOptionSideDto().toFormGroup()
      );

      this.valueChange.emit();
    }
  }

  onTopTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      switch (this.quantity.value) {
        case 1:
          this.valueChange.emit(true);
          break;
        case 2:
          (this.bottomInput.nativeElement as HTMLElement).focus();
          break;
        default:
          (this.topCenterInput.nativeElement as HTMLElement).focus();
          break;
      }
    }
  };

  onTopCenterTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      switch (this.quantity.value) {
        case 3:
          (this.bottomInput.nativeElement as HTMLElement).focus();
          break;
        case 4:
          (this.bottomCenterInput.nativeElement as HTMLElement).focus();
          break;
        default:
          (this.middleOneInput.nativeElement as HTMLElement).focus();
          break;
      }
    }
  };

  onMiddleOneTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      switch (this.quantity.value) {
        case 5:
          (this.bottomCenterInput.nativeElement as HTMLElement).focus();
          break;
      }
    }
  };

  onBottomCenterTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      (this.bottomInput.nativeElement as HTMLElement).focus();
    }
  };

  onBottomTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.valueChange.emit(true);
    }
  };

  onSizeBlur = (control: AbstractControl) => {
    this.valueChange.emit();
  };

  onSelectQuantity = () => {
    const quantity = this.quantity.value;
    const height = this.formGroup.get('height').value;

    this.topCenter.patchValue(null);
    this.middleOne.patchValue(null);
    this.bottomCenter.patchValue(null);
    this.bottom.patchValue(null);

    this.topCenter.clearValidators();
    this.middleOne.clearValidators();
    this.bottomCenter.clearValidators();
    this.bottom.clearValidators();

    this.top.patchValue(96);

    if (quantity >= 2) {
      this.bottom.patchValue(96);
      this.bottom.setValidators([Validators.required, Validators.min(50)]);
    }

    if (quantity === 3) {
      this.topCenter.patchValue(_.floor(height / 2, 0));
      this.topCenter.setValidators([Validators.required, Validators.min(50)]);
    }

    if (quantity === 4) {
      const offset = height - 96 - 96;
      const pos = _.floor(offset / 3, 0) + 96;

      this.topCenter.patchValue(pos);
      this.topCenter.setValidators([Validators.required, Validators.min(50)]);

      this.bottomCenter.patchValue(pos);
      this.bottomCenter.setValidators([
        Validators.required,
        Validators.min(50),
      ]);
    }

    if (quantity >= 5) {
      const offset = height - 96 - 96;
      const pos = _.floor(offset / 4, 0) + 96;

      this.topCenter.patchValue(pos);
      this.topCenter.setValidators([Validators.required, Validators.min(50)]);

      this.middleOne.patchValue(_.floor(height / 2, 0));
      this.middleOne.setValidators([Validators.required, Validators.min(50)]);

      this.bottomCenter.patchValue(pos);
      this.bottomCenter.setValidators([
        Validators.required,
        Validators.min(50),
      ]);
    }

    this.topCenter.updateValueAndValidity();
    this.middleOne.updateValueAndValidity();
    this.bottomCenter.updateValueAndValidity();
    this.bottom.updateValueAndValidity();

    this.valueChange.emit();
    (this.topInput.nativeElement as HTMLElement).focus();
  };
}
