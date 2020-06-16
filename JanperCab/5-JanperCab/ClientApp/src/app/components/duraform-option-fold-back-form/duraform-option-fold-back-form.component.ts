import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-option-fold-back-form',
  templateUrl: 'duraform-option-fold-back-form.component.html',
})
export class DuraformOptionFoldBackFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() valueChange = new EventEmitter();

  readonly typeKeyEnum = DuraformOptionTypeKey;
  foldBackLengths: any[];
  thicknesses: any[];
  foldBackTypes: any[];

  constructor(private fb: FormBuilder) {
    this.foldBackLengths = [
      { text: '100mm', value: 100 },
      { text: '200mm', value: 200 },
      { text: '300mm', value: 300 },
      { text: '400mm', value: 400 },
      { text: '500mm', value: 500 },
    ];
    this.thicknesses = [
      { text: '18mm', value: 18 },
      { text: '36mm', value: 36 },
    ];
    this.foldBackTypes = [
      { text: 'Single Return', value: false },
      { text: 'Double Return', value: true },
    ];
  }

  ngOnInit() {
    if (!this.formGroup.get('optionGroup')) {
      this.formGroup.addControl(
        'optionGroup',
        this.fb.group({
          optionTypeId: [this.typeKeyEnum.FoldBack, [Validators.required]],
          hasProfile: [false],
          length: [100, [Validators.required]],
          thickness: [18, [Validators.required]],
          hasDoubleReturn: [false],
        })
      );

      this.valueChange.emit();
    }
  }

  onValueChange = () => {
    this.valueChange.emit();
  };
}
