import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';

@Component({
  selector: 'app-duraform-option-no-face',
  templateUrl: 'duraform-option-no-face.component.html',
})
export class DuraformOptionNoFaceComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [this.typeKeyEnum.NoFaceRoute, [Validators.required]],
        })
      );

      this.valueChange.emit();
    }
  }
}
