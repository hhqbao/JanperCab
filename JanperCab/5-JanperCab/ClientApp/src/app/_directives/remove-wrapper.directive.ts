import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appRemoveWrapper]' })
export class RemoveWrapperDirective {
  constructor(private ef: ElementRef) {
    const target = this.ef.nativeElement as Element;
    const parent = target.parentElement;
    const grandParent = parent.parentElement;

    parent.removeChild(target);
    grandParent.insertBefore(target, parent.nextElementSibling);
    grandParent.removeChild(parent);
  }
}
