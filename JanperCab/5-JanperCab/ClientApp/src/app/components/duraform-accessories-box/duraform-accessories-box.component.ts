import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
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
  duraformEnquiry: DuraformEnquiryDto;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.duraformEnquiry = this.order.duraformEnquiry;

    this.formGroup = this.fb.group({
      hingeHoleTypeId: [this.duraformEnquiry.hingeHoleTypeId],
    });
  }

  onSelectHingeHoleType = () => {
    this.duraformEnquiry.hingeHoleTypeId = this.formGroup.value.hingeHoleTypeId;

    if (!this.duraformEnquiry.hingeHoleTypeId) {
      const componentsWithHingeHole = this.duraformEnquiry
        .componentsWithHingeHole;

      componentsWithHingeHole.forEach((x) => (x.hingeHoleOption = null));
    }
  };

  onSelectArch = (arch: DuraformArchForList) => {
    this.order.setArch(arch);
  };

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.order.setEdgeProfile(profile);
  };
}
