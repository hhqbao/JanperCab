import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appRemoveWrapper]' })
export class RemoveWrapperDirective {
  constructor(private ef: ElementRef) {
    const target = this.ef.nativeElement as Element;
    const parent = target.parentElement;
    const grandParent = parent.parentElement;

    console.log(target);
    console.log(parent);
    console.log(parent.parentNode);
    console.log(grandParent);

    if (!grandParent) {
      return;
    }

    parent.removeChild(target);
    grandParent.insertBefore(target, parent.nextElementSibling);
    grandParent.removeChild(parent);
  }
}
