import {
  Directive,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Directive()
export abstract class HingeHoleOptionBaseForm {
  @Input() formGroup: FormGroup;

  @Output() valueChange = new EventEmitter<boolean>();

  @ViewChild('optionForm') optionForm: HingeHoleOptionBaseForm;

  get optionGroup(): AbstractControl {
    return this.formGroup.get('hingeHole');
  }
}
