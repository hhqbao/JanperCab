import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appFormInvalidFocus]' })
export class FormInvalidFocusDirective {
  constructor(private ef: ElementRef) {}

  @HostListener('submit')
  onFormSubmit = () => {
    const target = this.ef.nativeElement as Element;
    const invalidControls = target.querySelectorAll('.ng-invalid');

    if (invalidControls[0]) {
      (invalidControls[0] as any).focus();
    }
  };
}
