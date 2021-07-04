import { HingeHoleOptionDto } from './../../_models/hinge-hole-option/HingeHoleOptionDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { HingeHoleStyleEnum } from '../../_enums/HingeHoleStyleEnum';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-hinge-hole-selector',
  templateUrl: 'hinge-hole-selector.component.html',
})
export class HingeHoleSelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @ViewChild('mainInput') mainInput: ElementRef;
  @ViewChild('topInput') topInput: ElementRef;
  @ViewChild('topCenterInput') topCenterInput: ElementRef;
  @ViewChild('middleOneInput') middleOneInput: ElementRef;
  @ViewChild('bottomCenterInput') bottomCenterInput: ElementRef;
  @ViewChild('bottomInput') bottomInput: ElementRef;

  styleFormControl: FormControl;

  showOption = false;

  quantities = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
  ];

  get quantity(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('quantity');
  }

  get top(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('top');
  }

  get topCenter(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('topCenter');
  }

  get middleOne(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('middleOne');
  }

  get bottomCenter(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('bottomCenter');
  }

  get bottom(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('bottom');
  }

  constructor(
    private fb: FormBuilder,
    private ef: ElementRef,
    public asset: DuraformAssetService
  ) {
    this.styleFormControl = this.fb.control(null);
  }

  ngOnInit() {
    if (this.formGroup.get('hingeHole')) {
      setTimeout(() => {
        this.styleFormControl.setValue(
          this.formGroup.get('hingeHole').value.hingeHoleStyle
        );
        this.updateMainInput();
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.showOption = false;
    }
  };

  onInputClick = () => {
    this.showOption = true;
  };

  onInputFocus = () => {
    this.showOption = true;
  };

  onMainInputTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.showOption = false;
    }
  };

  onTopTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      switch (this.quantity.value) {
        case 1:
          (this.mainInput.nativeElement as HTMLElement).focus();
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
      (this.mainInput.nativeElement as HTMLElement).focus();
    }
  };

  onSizeBlur = (control: AbstractControl) => {
    if (control.invalid) {
      control.setValue(96);
    }

    this.updateMainInput();
  };

  onSelectOption = () => {
    if (!this.styleFormControl.value) {
      this.formGroup.removeControl('hingeHole');
    } else {
      this.initialForm(this.styleFormControl.value);
    }

    this.updateMainInput();
    (this.mainInput.nativeElement as HTMLElement).focus();
  };

  onSelectQuantity = () => {
    const quantity = this.quantity.value;

    this.topCenter.patchValue(null);
    this.middleOne.patchValue(null);
    this.bottomCenter.patchValue(null);
    this.bottom.patchValue(null);

    this.topCenter.clearValidators();
    this.middleOne.clearValidators();
    this.bottomCenter.clearValidators();
    this.bottom.clearValidators();

    if (quantity >= 2) {
      this.bottom.patchValue(96);
      this.bottom.setValidators([Validators.required, Validators.min(50)]);
    }

    if (quantity >= 3) {
      this.topCenter.patchValue(96);
      this.topCenter.setValidators([Validators.required, Validators.min(50)]);
    }

    if (quantity >= 4) {
      this.bottomCenter.patchValue(96);
      this.bottomCenter.setValidators([
        Validators.required,
        Validators.min(50),
      ]);
    }

    if (quantity >= 5) {
      this.middleOne.patchValue(96);
      this.middleOne.setValidators([Validators.required, Validators.min(50)]);
    }

    this.topCenter.updateValueAndValidity();
    this.middleOne.updateValueAndValidity();
    this.bottomCenter.updateValueAndValidity();
    this.bottom.updateValueAndValidity();

    this.updateMainInput();
    (this.topInput.nativeElement as HTMLElement).focus();
  };

  private initialForm = (hingeHoleStyle: HingeHoleStyleEnum) => {
    this.formGroup.removeControl('hingeHole');

    const emptyOption = new HingeHoleOptionDto();
    emptyOption.hingeHoleStyle = hingeHoleStyle;

    this.formGroup.addControl('hingeHole', emptyOption.toFormGroup());

    // if (!this.formGroup.get('hingeHole')) {
    //   const emptyOption = new HingeHoleOptionDto();
    //   emptyOption.hingeHoleStyle = hingeHoleStyle;

    //   this.formGroup.addControl('hingeHole', emptyOption.toFormGroup());
    // } else {
    //   this.formGroup.get('hingeHole').patchValue({
    //     hingeHoleStyle,
    //   });
    // }
  };

  private updateMainInput = () => {
    if (this.formGroup.get('hingeHole')) {
      const formValue = this.formGroup.get('hingeHole').value;

      const style = HingeHoleStyleEnum[formValue.hingeHoleStyle];
      let valueString = '';

      switch (formValue.quantity) {
        case 1:
          valueString = `${style} ${formValue.top}`;
          break;
        case 2:
          valueString = `${style} ${formValue.top}/${formValue.bottom}`;
          break;
        case 3:
          valueString = `${style} ${formValue.top}/${formValue.topCenter}/${formValue.bottom}`;
          break;
        case 4:
          valueString = `${style} ${formValue.top}/${formValue.topCenter}/${formValue.bottomCenter}/${formValue.bottom}`;
          break;
        case 5:
          valueString = `${style} ${formValue.top}/${formValue.topCenter}/${formValue.middleOne}/${formValue.bottomCenter}/${formValue.bottom}`;
          break;
        default:
          valueString = 'Unsupported Hinge Hole Quantity';
          break;
      }

      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        valueString
      );
    } else {
      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        'No Hinge Hole'
      );
    }
  };
}
