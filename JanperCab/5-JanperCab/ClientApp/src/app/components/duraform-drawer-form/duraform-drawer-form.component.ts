import { DuraformDrawerForCart } from '../../_models/duraform-drawer/DuraformDrawerForCart';
import { DuraformDoorForCart } from '../../_models/duraform-door/DuraformDoorForCart';
import { DuraformDrawerTypeForList } from '../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-form',
  templateUrl: 'duraform-drawer-form.component.html',
})
export class DuraformDrawerFormComponent implements OnInit {
  @Input() duraformDrawer: DuraformDrawerForCart;
  @Input() duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      duraformDrawerTypeId: [null, [Validators.required]],
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(150), Validators.max(1200)],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      drawerOne: [null, [Validators.min(0)]],
      drawerTwo: [null, [Validators.min(0)]],
      drawerThree: [null, [Validators.min(0)]],
      drawerFour: [null, [Validators.min(0)]],
      drawerFive: [null, [Validators.min(0)]],
      note: [''],
    });

    if (this.duraformDrawer) {
      this.formGroup.patchValue({ ...this.duraformDrawer });
      this.formGroup.patchValue({
        duraformDrawerTypeId: this.duraformDrawer.duraformDrawerType?.id,
      });
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
