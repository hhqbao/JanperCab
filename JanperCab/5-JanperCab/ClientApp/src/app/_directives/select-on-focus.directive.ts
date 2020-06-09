import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appSelectOnFocus]' })
export class SelectOnFocusDirective {
  constructor(private ef: ElementRef) {}

  @HostListener('focus')
  onFocus = () => {
    this.ef.nativeElement.select();
  };
}
