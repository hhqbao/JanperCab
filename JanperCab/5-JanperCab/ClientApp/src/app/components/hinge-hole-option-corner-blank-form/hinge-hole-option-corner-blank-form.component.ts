import { HingeHoleOptionCornerBlankDto } from './../../_models/hinge-hole-option/HingeHoleOptioCornerBlankDto';
import { HingeHoleOptionBaseForm } from '../hinge-hole-option-base-form/hinge-hole-option-base-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hinge-hole-option-corner-blank-form',
  templateUrl: 'hinge-hole-option-corner-blank-form.component.html',
})
export class HingeHoleOptionCornerBlankFormComponent
  extends HingeHoleOptionBaseForm
  implements OnInit
{
  ngOnInit() {
    if (!this.optionGroup) {
      this.formGroup.addControl(
        'hingeHole',
        new HingeHoleOptionCornerBlankDto().toFormGroup()
      );

      this.valueChange.emit();
    }
  }
}
