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
  @Output() submit = new EventEmitter();

  self: HTMLElement;

  constructor(private ef: ElementRef, private dialog: DialogService) {
    this.self = this.ef.nativeElement;
  }

  ngOnInit(): void {}

  private get controls(): HTMLElement[] {
    return Array.from(this.self.querySelectorAll('input,select'));
  }

  private onSubmit = () => {
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
    this.submit.emit();
  };

  @HostListener('keydown.Enter', ['$event'])
  @HostListener('keydown.Tab', ['$event'])
  onNavigateControl = (event: KeyboardEvent) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

    const currentIndex = this.controls.indexOf(target);
    if (currentIndex + 1 === this.controls.length) {
      this.onSubmit();
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
    this.onSubmit();
  };
}
