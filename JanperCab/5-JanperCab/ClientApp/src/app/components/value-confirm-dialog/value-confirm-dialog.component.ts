import { DialogService } from './../../_services/dialog.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-value-confirm-dialog',
  templateUrl: 'value-confirm-dialog.component.html',
})
export class ValueConfirmDialogComponent implements OnInit {
  @Input() object: any;
  @Input() valueKey: string;
  @Input() headingText: string;
  @Input() bodyText: string;
  @Input() placeHolder: string;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  formGroup: FormGroup;

  get valueControl(): AbstractControl {
    return this.formGroup.get('value');
  }

  constructor(private fb: FormBuilder, private dialogService: DialogService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      value: [null, [Validators.required]],
    });
  }

  onConfirm = () => {
    const inputValue = this.formGroup.get('value').value;

    if (inputValue === `${this.object[this.valueKey]}`) {
      this.confirm.emit();
    } else {
      this.valueControl.patchValue(null);
      this.valueControl.updateValueAndValidity();
      this.dialogService.alert(
        'Confirm Failed',
        'Value Not Match! Please Try Again.',
        null
      );
    }
  };
}
