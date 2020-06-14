import { DuraformWrappingOptionForList } from './../../_models/duraform-wrapping-option/DuraformWrappingOptionForList';
import { EndPanelForCart } from '../../_models/end-panel/EndPanelForCart';
import { DialogService } from '../../_services/dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-end-panel-form',
  templateUrl: 'end-panel-form.component.html',
})
export class EndPanelFormComponent implements OnInit {
  @Input() endPanel: EndPanelForCart;
  @Input() wrappingOptions: DuraformWrappingOptionForList[] = [];
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private dialog: DialogService) {}

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
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      extraRailLeft: [null, [Validators.min(0), Validators.max(500)]],
      extraRailRight: [null, [Validators.min(0), Validators.max(500)]],
      wrappingOptionId: [null],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.endPanel) {
      this.formGroup.patchValue({
        ...this.endPanel,
        wrappingOptionId: this.endPanel.duraformWrappingOption?.id,
      });
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
