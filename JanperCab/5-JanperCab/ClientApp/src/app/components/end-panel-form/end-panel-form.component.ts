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
      numberOfShields: [null, [Validators.min(0), Validators.max(10)]],
      extraRailBottom: [null, [Validators.min(0), Validators.max(500)]],
      extraRailTop: [null, [Validators.min(0), Validators.max(500)]],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.endPanel) {
      this.formGroup.patchValue({ ...this.endPanel });
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
