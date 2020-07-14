import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-door-form',
  templateUrl: 'duraform-door-form.component.html',
})
export class DuraformDoorFormComponent implements OnInit {
  @Input() door: DuraformDoorDto;
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
      height: [
        null,
        [Validators.required, Validators.min(50), Validators.max(2500)],
      ],
      width: [
        null,
        [Validators.required, Validators.min(50), Validators.max(1200)],
      ],
      duraformEdgeProfileId: [
        this.order.selectedEdgeProfile.id,
        [Validators.required],
      ],
      top: [false],
      bottom: [false],
      left: [false],
      right: [false],
      note: [''],
    });

    if (this.door) {
      this.formGroup.patchValue({ ...this.door });
      if (this.door.duraformOption) {
        this.formGroup.addControl(
          'optionGroup',
          this.door.duraformOption.toFormGroup()
        );
      }
      if (this.door.hingeHoleOption) {
        this.formGroup.addControl(
          'hingeHole',
          this.door.hingeHoleOption.toFormGroup()
        );
      }
    }
  }

  onSubmit = () => {
    if (!this.order.hingeHoleTypeId) {
      this.formGroup.removeControl('hingeHole');
    }

    this.formSubmit.emit(this.formGroup);
  };
}
