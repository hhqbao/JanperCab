import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DialogService } from 'src/app/_services/dialog.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DuraformMiscDto } from 'src/app/_models/duraform-misc/DuraformMiscDto';

@Component({
  selector: 'app-duraform-misc-form',
  templateUrl: 'duraform-misc-form.component.html',
})
export class DuraformMiscFormComponent implements OnInit {
  @Input() misc: DuraformMiscDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    public asset: DuraformAssetService
  ) {}

  get invalid(): boolean {
    return this.formGroup.invalid;
  }

  get quantity(): AbstractControl {
    return this.formGroup.get('quantity');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      miscItemId: [null, [Validators.required]],
      note: [],
    });

    if (this.misc) {
      this.formGroup.patchValue({ ...this.misc });
    }
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      if (this.quantity.errors) {
        if (this.quantity.errors.required) {
          return this.showErrorMsg('Quantity is required!');
        }
        if (this.quantity.errors.min) {
          return this.showErrorMsg('Quantity must be at least 1');
        }
      }
    }

    this.formSubmit.emit(this.formGroup);
  };

  private showErrorMsg(msg: string) {
    this.dialog.alert('Invalid Inputs', msg, null);
  }
}
