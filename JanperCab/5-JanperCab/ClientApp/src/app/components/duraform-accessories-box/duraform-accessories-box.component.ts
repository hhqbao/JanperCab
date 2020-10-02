import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DialogService } from './../../_services/dialog.service';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformArchForList } from 'src/app/_models/duraform-arch/DuraformArchForList';

@Component({
  selector: 'app-duraform-accessories-box',
  templateUrl: 'duraform-accessories-box.component.html',
})
export class DuraformAccessoriesBoxComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      hingeHoleTypeId: [this.order.hingeHoleTypeId],
    });
  }

  onSelectHingeHoleType = () => {
    this.order.hingeHoleTypeId = this.formGroup.value.hingeHoleTypeId;
  };

  onSelectArch = (arch: DuraformArchForList) => {
    this.order.selectArch(arch);
  };

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.order.selectEdgeProfile(profile);
  };
}
