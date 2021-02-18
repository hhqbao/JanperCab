import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appDropdownBtn]' })
export class DropdownBtnDirective {
  @Input('appDropdownBtn') toggleClass: string;

  target: Element;

  constructor(private elementRef: ElementRef) {
    this.target = this.elementRef.nativeElement;
  }

  @HostListener('click')
  onClick = () => {
    this.target.classList.toggle(this.toggleClass || 'active');
  };

  @HostListener('document:click', ['$event.target'])
  onClickOutside = (clickedElement: Element) => {
    if (!this.target.contains(clickedElement)) {
      this.target.classList.remove(this.toggleClass || 'active');
    }
  };
}
