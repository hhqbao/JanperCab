import { HingeHoleOptionDrawDto } from './../../_models/hinge-hole-option/HingeHoleOptionDrawDto';
import { HingeHoleOptionBaseForm } from '../hinge-hole-option-base-form/hinge-hole-option-base-form';
import { HingeHoleDirectionEnum } from '../../_enums/HingeHoleDirectionEnum';
import { HingeHoleOptionSideDto } from '../../_models/hinge-hole-option/HingeHoleOptionSideDto';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-hinge-hole-option-draw-form',
  templateUrl: 'hinge-hole-option-draw-form.component.html',
})
export class HingeHoleOptionDrawFormComponent
  extends HingeHoleOptionBaseForm
  implements OnInit
{
  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'hingeHole',
        new HingeHoleOptionDrawDto().toFormGroup()
      );

      this.valueChange.emit();
    }
  }
}
