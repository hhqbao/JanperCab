import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-end-panel-form',
  templateUrl: 'end-panel-form.component.html',
})
export class EndPanelFormComponent implements OnInit {
  @Input() endPanel: DuraformEndPanelDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  duraformOptionTypeKey = DuraformOptionTypeKey;
  formGroup: FormGroup;

  constructor(public order: DuraformOrderService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      numberOfShields: [
        2,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      railLeft: [
        56,
        [Validators.required, Validators.min(30), Validators.max(100)],
      ],
      railCenter: [
        56,
        [Validators.required, Validators.min(30), Validators.max(100)],
      ],
      railRight: [
        56,
        [Validators.required, Validators.min(30), Validators.max(100)],
      ],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.endPanel) {
      this.formGroup.patchValue({
        ...this.endPanel,
      });
      if (this.endPanel.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.endPanel.duraformOption.toFormGroup()
        );
      }
    }
  }

  get numberOfShields(): AbstractControl {
    return this.formGroup.get('numberOfShields');
  }

  get railLeft(): AbstractControl {
    return this.formGroup.get('railLeft');
  }

  get railCenter(): AbstractControl {
    return this.formGroup.get('railCenter');
  }

  get railRight(): AbstractControl {
    return this.formGroup.get('railRight');
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
