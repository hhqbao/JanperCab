import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-drawer-form',
  templateUrl: 'duraform-drawer-form.component.html',
})
export class DuraformDrawerFormComponent implements OnInit {
  @Input() duraformDrawer: DuraformDrawerDto;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  formGroup: FormGroup;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder
  ) {}

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
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      drawerOne: [null, [Validators.min(0), Validators.max(2500)]],
      drawerTwo: [null, [Validators.min(0), Validators.max(2500)]],
      drawerThree: [null, [Validators.min(0), Validators.max(2500)]],
      drawerFour: [null, [Validators.min(0), Validators.max(2500)]],
      drawerFive: [null, [Validators.min(0), Validators.max(2500)]],
      note: [''],
    });

    if (this.duraformDrawer) {
      this.formGroup.patchValue({ ...this.duraformDrawer });
    }
  }

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
