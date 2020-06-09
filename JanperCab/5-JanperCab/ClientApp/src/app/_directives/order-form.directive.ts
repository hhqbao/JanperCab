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

  self: Element;
  controls: Element[] = [];

  constructor(private ef: ElementRef, private dialog: DialogService) {
    this.self = this.ef.nativeElement;
  }

  ngOnInit(): void {
    this.controls = Array.from(this.self.querySelectorAll('input,select'));
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.tab', ['$event'])
  onNavigateControl = (event: KeyboardEvent) => {
    event.preventDefault();

    const target = event.target as Element;

    const currentIndex = this.controls.indexOf(target);
    if (currentIndex + 1 === this.controls.length) {
      if (this.formGroup.valid) {
        this.submit.emit();
        (this.controls[0] as any).focus();
        return;
      }

      const invalidControl = this.controls.filter((x) =>
        x.classList.contains('ng-invalid')
      )[0];

      if (invalidControl) {
        (invalidControl as any).focus();
      }

      this.dialog.error('Please provide all the required fields.');
    } else {
      (this.controls[currentIndex + 1] as any).focus();
    }
  };
}
