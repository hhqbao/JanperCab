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
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

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

  sideFormControl: FormControl;

  showOption = false;

  options = [
    { text: 'Pair', value: 'Pair' },
    { text: 'Left', value: 'Left' },
    { text: 'Right', value: 'Right' },
  ];
  quantities = [
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

  constructor(private fb: FormBuilder, private ef: ElementRef) {
    this.sideFormControl = this.fb.control(null);
  }

  ngOnInit() {
    if (this.formGroup.get('hingeHole')) {
      setTimeout(() => {
        this.sideFormControl.setValue(
          this.formGroup.get('hingeHole').value.side
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
    if (!this.sideFormControl.value) {
      this.formGroup.removeControl('hingeHole');
    } else {
      this.initialForm(this.sideFormControl.value);
    }

    this.updateMainInput();
    (this.mainInput.nativeElement as HTMLElement).focus();
  };

  onSelectQuantity = () => {
    const quantity = this.quantity.value;

    switch (quantity) {
      case 2:
        this.topCenter.patchValue(null);
        this.bottomCenter.patchValue(null);

        this.topCenter.clearValidators();
        this.bottomCenter.clearValidators();
        break;
      case 3:
        this.topCenter.patchValue(96);
        this.topCenter.setValidators([Validators.required, Validators.min(50)]);

        this.bottomCenter.patchValue(null);
        this.bottomCenter.clearValidators();
        break;
      case 4:
        this.topCenter.patchValue(96);
        this.bottomCenter.patchValue(96);

        this.topCenter.setValidators([Validators.required, Validators.min(50)]);
        this.bottomCenter.setValidators([
          Validators.required,
          Validators.min(50),
        ]);
        break;
    }

    this.updateMainInput();
    (this.topInput.nativeElement as HTMLElement).focus();
  };

  private initialForm = (side: string) => {
    if (!this.formGroup.get('hingeHole')) {
      this.formGroup.addControl(
        'hingeHole',
        this.fb.group({
          side: [side, Validators.required],
          quantity: [
            2,
            [Validators.required, Validators.min(2), Validators.max(4)],
          ],
          top: [96, [Validators.required, Validators.min(50)]],
          topCenter: [null, []],
          bottomCenter: [null, []],
          bottom: [96, [Validators.required, Validators.min(50)]],
        })
      );
    } else {
      this.formGroup.get('hingeHole').patchValue({
        side,
      });
    }
  };

  private updateMainInput = () => {
    if (this.formGroup.get('hingeHole')) {
      const formValue = this.formGroup.get('hingeHole').value;
      let valueString = '';

      switch (formValue.quantity) {
        case 2:
          valueString = `${formValue.side} ${formValue.top}/${formValue.bottom}`;
          break;
        case 3:
          valueString = `${formValue.side} ${formValue.top}/${formValue.topCenter}/${formValue.bottom}`;
          break;
        case 4:
          valueString = `${formValue.side} ${formValue.top}/${formValue.topCenter}/${formValue.bottomCenter}/${formValue.bottom}`;
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
