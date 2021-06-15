import { Directive, Input } from '@angular/core';

@Directive()
export abstract class DuraformComponentList {
  @Input() canEditPrice = false;
}
