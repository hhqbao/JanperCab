import { DialogService } from 'src/app/_services/dialog.service';
import { FormGroup } from '@angular/forms';
import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({ selector: '[appOrderForm]' })
export class OrderFormDirective implements OnInit {
  @Input() formGroup: FormGroup;

  // tslint:disable-next-line: no-output-native
  @Output() submit = new EventEmitter<any>();

  self: HTMLElement;

  constructor(private ef: ElementRef, private dialog: DialogService) {
    this.self = this.ef.nativeElement;
  }

  ngOnInit(): void {}

  private get controls(): HTMLElement[] {
    const controls = Array.from<HTMLElement>(
      this.self.querySelectorAll('input,select')
    );

    return controls.filter((x) => !x.classList.contains('tab-ignore'));
  }

  private onSubmit = () => {
    if (!this.formGroup) {
      return;
    }

    if (this.formGroup.valid) {
      this.controls[0].focus();
    } else {
      const invalidControl = this.controls.filter((x) =>
        x.classList.contains('ng-invalid')
      )[0];

      if (invalidControl) {
        invalidControl.focus();
      }

      this.dialog.error('Please provide all the required fields.');
    }

    if (this.submit) {
      this.submit.emit();
    }
  };

  @HostListener('keydown.Enter', ['$event'])
  @HostListener('keydown.Tab', ['$event'])
  onNavigateControl = (event: KeyboardEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (target.classList.contains('tab-ignore')) {
      return;
    }

    const currentIndex = this.controls.indexOf(target);
    if (currentIndex + 1 === this.controls.length) {
      if (this.onSubmit) {
        this.onSubmit();
      }
    } else {
      this.controls[currentIndex + 1].focus();
    }
  };

  @HostListener('keydown.0', ['$event'])
  onZeroDown = (event) => {
    const target = event.target as HTMLElement;

    if (target.getAttribute('type') === 'checkbox') {
      target.click();
    }
  };

  @HostListener('keydown.Control')
  onCtrlDown = () => {
    if (this.onSubmit) {
      this.onSubmit();
    }
  };
}
