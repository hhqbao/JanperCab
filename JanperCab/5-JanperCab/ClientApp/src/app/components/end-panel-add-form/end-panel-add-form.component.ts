import { EndPanelForCart } from './../../_models/end-panel/EndPanelForCart';
import { DialogService } from './../../_services/dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-end-panel-add-form',
  templateUrl: 'end-panel-add-form.component.html',
})
export class EndPanelAddFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<EndPanelForCart>();

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
      numberOfShields: [null, [Validators.min(0), Validators.max(10)]],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const endPanel: EndPanelForCart = { ...this.formGroup.value };

    this.formSubmit.emit(endPanel);
  };
}
