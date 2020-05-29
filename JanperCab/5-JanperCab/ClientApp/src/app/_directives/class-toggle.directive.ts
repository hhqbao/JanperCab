import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appClassToggle]' })
export class ClassToggleDirective {
  @Input('appClassToggle') toggleClass: string;
  target: Element;

  constructor(private elementRef: ElementRef) {
    this.target = elementRef.nativeElement;
  }

  @HostListener('click')
  onClick = () => {
    if (!this.toggleClass) {
      return;
    }

    this.target.classList.toggle(this.toggleClass);
  };
}
