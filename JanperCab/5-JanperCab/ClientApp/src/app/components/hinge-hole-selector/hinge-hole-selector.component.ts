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
  @ViewChild('bottomInput') bottomInput: ElementRef;

  sideFormControl: FormControl;
  showOption = false;
  options = [
    { text: 'Left', value: 'Left' },
    { text: 'Right', value: 'Right' },
  ];

  get top(): AbstractControl {
    return this.formGroup.get('hingeHole')?.get('top');
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

  private initialForm = (side: string) => {
    if (!this.formGroup.get('hingeHole')) {
      this.formGroup.addControl(
        'hingeHole',
        this.fb.group({
          side: [side, Validators.required],
          top: [96, [Validators.required, Validators.min(50)]],
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

      (this.mainInput.nativeElement as HTMLElement).setAttribute(
        'value',
        `${formValue.side} ${formValue.top}/${formValue.bottom}`
      );
    } else {
      (this.mainInput.nativeElement as HTMLElement).setAttribute('value', '');
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
      (this.bottomInput.nativeElement as HTMLElement).focus();
    }
  };

  onBottomTab = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      (this.mainInput.nativeElement as HTMLElement).focus();
    }
  };

  onTopBlur = () => {
    if (this.top.invalid) {
      this.top.setValue(96);
    }

    this.updateMainInput();
  };

  onBottomBlur = () => {
    if (this.bottom.invalid) {
      this.bottom.setValue(96);
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
}
