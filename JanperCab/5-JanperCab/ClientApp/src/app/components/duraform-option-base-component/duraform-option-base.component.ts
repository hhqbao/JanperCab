import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Directive()
export abstract class DuraformOptionBaseComponent {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  get optionGroup(): AbstractControl {
    return this.formGroup.get('optionGroup');
  }

  constructor() {}

  abstract updateRequirements(): void;
  abstract onChange(): void;
}
