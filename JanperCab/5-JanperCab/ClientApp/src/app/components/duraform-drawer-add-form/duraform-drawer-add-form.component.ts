import { DuraformDrawerForCart } from './../../_models/duraform-drawer/DuraformDrawerForCart';
import { DuraformDoorForCart } from './../../_models/duraform-door/DuraformDoorForCart';
import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-add-form',
  templateUrl: 'duraform-drawer-add-form.component.html',
})
export class DuraformDrawerAddFormComponent implements OnInit {
  @Input() duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  @Output() formSubmit = new EventEmitter<DuraformDrawerForCart>();

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
  }

  onSubmit = () => {
    if (this.formGroup.invalid) {
      return;
    }

    const formValue = this.formGroup.value;
    const drawer = new DuraformDrawerForCart();
    drawer.quantity = formValue.quantity;
    drawer.height = formValue.height;
    drawer.width = formValue.width;
    drawer.top = formValue.top;
    drawer.bottom = formValue.bottom;
    drawer.left = formValue.left;
    drawer.right = formValue.right;
    drawer.drawerOne = formValue.drawerOne;
    drawer.drawerTwo = formValue.drawerTwo;
    drawer.drawerThree = formValue.drawerThree;
    drawer.drawerFour = formValue.drawerFour;
    drawer.drawerFive = formValue.drawerFive;
    drawer.note = formValue.note;

    const drawerType = this.duraformDrawerTypes.find(
      (x) => x.id === +formValue.duraformDrawerTypeId
    );
    drawer.duraformDrawerType = drawerType;

    this.formSubmit.emit(drawer);
  };
}
