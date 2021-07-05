import { HingeHoleOptionCornerDoorDto } from './../../_models/hinge-hole-option/HingeHoleOptionCornerDoorDto';
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
  selector: 'app-hinge-hole-option-corner-door-form',
  templateUrl: 'hinge-hole-option-corner-door-form.component.html',
})
export class HingeHoleOptionCornerDoorFormComponent
  extends HingeHoleOptionBaseForm
  implements OnInit
{
  @ViewChild('leftTopInput') leftTopInput: ElementRef;
  @ViewChild('leftBottomInput') leftBottomInput: ElementRef;
  @ViewChild('rightTopInput') rightTopInput: ElementRef;
  @ViewChild('rightBottomInput') rightBottomInput: ElementRef;

  get leftTop(): AbstractControl {
    return this.optionGroup?.get('leftTop');
  }

  get leftBottom(): AbstractControl {
    return this.optionGroup?.get('leftBottom');
  }

  get rightTop(): AbstractControl {
    return this.optionGroup?.get('rightTop');
  }

  get rightBottom(): AbstractControl {
    return this.optionGroup?.get('rightBottom');
  }

  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'hingeHole',
        new HingeHoleOptionCornerDoorDto().toFormGroup()
      );

      this.valueChange.emit();
    }
  }

  onInputTab = (event: KeyboardEvent, input: any) => {
    console.log('aa');
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (input) {
        console.log(input);
        (input as HTMLElement).focus();
        return;
      } else {
        this.valueChange.emit(true);
      }
    }
  };

  onSizeBlur = (control: AbstractControl) => {
    if (control.invalid) {
      control.setValue(96);
    }

    this.valueChange.emit();
  };
}
