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

  numberDrawers = [
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

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
      numberOfDrawers: [
        null,
        [Validators.required, Validators.min(2), Validators.max(5)],
      ],
      duraformDrawerTypeId: [null, [Validators.required]],
      height: [
        null,
        [Validators.required, Validators.min(30), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(150), Validators.max(2500)],
      ],
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      hasDrillFronts: [false],
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

  onHeightChange = () => {
    if (this.formGroup.get('height').invalid) {
      this.formGroup.get('numberOfDrawers').patchValue(null);
      this.formGroup.get('duraformDrawerTypeId').patchValue(null);
    }
  };

  onSubmit = () => {
    this.formSubmit.emit(this.formGroup);
  };
}
