import { HingeHoleSelectorComponent } from './../hinge-hole-selector/hinge-hole-selector.component';
import { DuraformEndPanelDto } from 'src/app/_models/duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from 'src/app/_models/duraform-component/DuraformPantryDoorDto';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DialogService } from './../../_services/dialog.service';
import {
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DuraformOptionSelectorComponent } from '../duraform-option-selector/duraform-option-selector.component';

export abstract class DuraformComponentFormComponent<
  T extends
    | DuraformDoorDto
    | DuraformPantryDoorDto
    | DuraformEndPanelDto
    | DuraformDrawerDto
> {
  @Input() component: T;

  @Output() formSubmit = new EventEmitter<FormGroup>();

  @ViewChild('optionSelector') optionSelector: DuraformOptionSelectorComponent;
  @ViewChild('hingeHoleSelector') hingeHoleSelector: HingeHoleSelectorComponent;

  formGroup: FormGroup;

  get invalid(): boolean {
    return this.formGroup.invalid;
  }

  get quantity(): AbstractControl {
    return this.formGroup.get('quantity');
  }

  get height(): AbstractControl {
    return this.formGroup.get('height');
  }

  get width(): AbstractControl {
    return this.formGroup.get('width');
  }

  constructor(protected ef: ElementRef, protected dialog: DialogService) {}

  abstract onBasicInputBlur(): void;
  abstract onSubmit(): void;

  protected showErrorMsg(msg: string) {
    const target = this.ef.nativeElement as HTMLElement;
    const invalidControls = target.querySelectorAll('input.ng-invalid');

    if (invalidControls[0]) {
      (invalidControls[0] as any).focus();
    }

    this.dialog.error(msg);
  }
}
