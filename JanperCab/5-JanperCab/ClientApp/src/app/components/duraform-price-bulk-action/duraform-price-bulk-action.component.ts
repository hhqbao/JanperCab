import { DuraformPriceBulkAction } from './../../_models/duraform-price/DuraformPriceBulkAction';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-price-bulk-action',
  templateUrl: 'duraform-price-bulk-action.component.html',
})
export class DuraformPriceBulkActionComponent implements OnInit {
  @Output() apply = new EventEmitter<DuraformPriceBulkAction>();
  @Output() cancel = new EventEmitter();

  formGroup: FormGroup;

  operators: any[] = [
    { id: '+', text: 'Increase' },
    { id: '-', text: 'Decrease' },
  ];

  units: any[] = [
    { id: '$', text: 'Dollar' },
    { id: '%', text: 'Percentage' },
  ];

  get operatorControl(): AbstractControl {
    return this.formGroup.get('operator');
  }

  get valueControl(): AbstractControl {
    return this.formGroup.get('value');
  }

  get unitControl(): AbstractControl {
    return this.formGroup.get('unit');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      operator: ['+', [Validators.required]],
      value: [null, [Validators.required]],
      unit: ['$', [Validators.required]],
    });
  }

  onApply = () => {
    const bulkAction = new DuraformPriceBulkAction();
    bulkAction.operator = this.operatorControl.value;
    bulkAction.value = this.valueControl.value;
    bulkAction.unit = this.unitControl.value;

    this.apply.emit(bulkAction);
  };

  onCancel = () => {
    if (this.cancel) this.cancel.emit();
  };
}
