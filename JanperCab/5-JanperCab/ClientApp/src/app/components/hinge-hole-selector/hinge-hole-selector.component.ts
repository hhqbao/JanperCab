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
  @ViewChild('bottomCenterInput') bottomCenterInput: ElementRef;
  @ViewChild('bottomInput') bottomInput: ElementRef;

  styleFormControl: FormControl;

  showOption = false;

  quantities = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
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

  get bottomCenter(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('bottomCenter');
  }

  get bottom(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('bottom');
  }

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.showOption = false;
    }
  };

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
      if (this.quantity.value === 2) {
        (this.bottomInput.nativeElement as HTMLElement).focus();
      } else {
        (this.topCenterInput.nativeElement as HTMLElement).focus();
      }
    }
  };

  onTopCenterTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (this.quantity.value > 3) {
        (this.bottomCenterInput.nativeElement as HTMLElement).focus();
      } else {
        (this.bottomInput.nativeElement as HTMLElement).focus();
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
    this.bottomCenter.patchValue(null);
    this.bottom.patchValue(null);

    this.topCenter.clearValidators();
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

    this.topCenter.updateValueAndValidity();
    this.bottomCenter.updateValueAndValidity();
    this.bottom.updateValueAndValidity();

    this.updateMainInput();
    (this.topInput.nativeElement as HTMLElement).focus();
  };

  private initialForm = (hingeHoleStyle: HingeHoleStyleEnum) => {
    if (!this.formGroup.get('hingeHole')) {
      this.formGroup.addControl(
        'hingeHole',
        this.fb.group({
          hingeHoleStyle: [hingeHoleStyle, Validators.required],
          quantity: [
            2,
            [Validators.required, Validators.min(1), Validators.max(4)],
          ],
          top: [96, [Validators.required, Validators.min(50)]],
          topCenter: [null, []],
          bottomCenter: [null, []],
          bottom: [96, [Validators.required, Validators.min(50)]],
        })
      );
    } else {
      this.formGroup.get('hingeHole').patchValue({
        hingeHoleStyle,
      });
    }
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
        default:
          valueString = 'Unsupported Hinge Hole Quantity';
          break;
      }

      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        valueString
      );
    } else {
      (this.mainInput.nativeElement as HTMLElement).setAttribute('value', '');
    }
  };
}
