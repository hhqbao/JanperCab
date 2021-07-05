import { HingeHoleTypeDto } from './../../_models/hinge-hole-type/HingeHoleTypeDto';
import { DuraformArchDto } from './../../_models/duraform-arch/DuraformArchDto';
import { DuraformEdgeProfileDto } from './../../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-accessories-box',
  templateUrl: 'duraform-accessories-box.component.html',
})
export class DuraformAccessoriesBoxComponent implements OnInit {
  formGroup: FormGroup;
  duraformEnquiry: DuraformEnquiryDto;

  blackBoardOpts = [
    { text: 'Yes', value: true },
    { text: 'No', value: false },
  ];

  get hingeHoleTypeIdControl(): AbstractControl {
    return this.formGroup.get('hingeHoleTypeId');
  }

  get useBlackBoardControl(): AbstractControl {
    return this.formGroup.get('useBlackBoard');
  }

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.duraformEnquiry = this.order.duraformEnquiry;

    this.formGroup = this.fb.group({
      hingeHoleTypeId: [this.duraformEnquiry.hingeHoleTypeId],
      useBlackBoard: [this.duraformEnquiry.useBlackBoard],
    });
  }

  onSelectHingeHoleType = () => {
    let hingeType: HingeHoleTypeDto = null;

    if (this.hingeHoleTypeIdControl.value) {
      hingeType = this.asset.getHingeType(this.hingeHoleTypeIdControl.value);
    }

    this.order.setHingeHoleType(hingeType);
  };

  onSelectBlackBoard = () => {
    this.order.setChoiceOfBlackBoard(this.useBlackBoardControl.value);
  };

  onSelectArch = (arch: DuraformArchDto) => {
    this.order.setArch(arch);
  };

  onSelectProfile = (profile: DuraformEdgeProfileDto) => {
    this.order.setEdgeProfile(profile);
  };
}
