import { DialogService } from './../../_services/dialog.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { FormGroup } from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';

@Component({
  selector: 'app-edge-profile-form-control',
  templateUrl: 'edge-profile-form-control.component.html',
})
export class EdgeProfileFormControlComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() hideEdgeProfile = false;

  optionType = DuraformOptionTypeKey;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  get allowedEdgeProfiles(): DuraformEdgeProfileForList[] {
    const allowedList = this.asset.getAllowedEdgeProfiles(
      this.order.selectedDesign
    );

    return allowedList;
  }

  get selectedEdgeProfile(): DuraformEdgeProfileForList {
    const edgeId = +this.formGroup.get('duraformEdgeProfileId').value;

    if (!edgeId) {
      return null;
    }

    const edgeProfile = this.asset.getEdgeProfile(edgeId);

    return edgeProfile;
  }

  get cannotSelect(): boolean {
    if (this.allowedEdgeProfiles.length === 1) return true;

    const optionGroup = this.formGroup.get('optionGroup');

    if (
      optionGroup &&
      optionGroup.value.optionTypeId === this.optionType.FoldBack
    )
      return true;

    return false;
  }

  ngOnInit() {
    if (this.allowedEdgeProfiles.length === 1) {
      this.formGroup
        .get('duraformEdgeProfileId')
        .patchValue(this.allowedEdgeProfiles[0].id);

      this.onSelectEdgeProfile();
    }
  }

  onSelectEdgeProfile = () => {
    const edgeId = +this.formGroup.get('duraformEdgeProfileId').value;

    const selectedEdgeProfile = this.asset.getEdgeProfile(edgeId);

    this.formGroup.get('top').setValue(selectedEdgeProfile.forceTop ?? false);
    this.formGroup
      .get('bottom')
      .setValue(selectedEdgeProfile.forceBottom ?? false);
    this.formGroup.get('left').setValue(selectedEdgeProfile.forceLeft ?? false);
    this.formGroup
      .get('right')
      .setValue(selectedEdgeProfile.forceRight ?? false);
  };

  onEdgeTickChange = () => {
    const { top, bottom, left, right } = this.formGroup.value;

    if (top && bottom && left && right) {
      const edgeProfile = this.asset.edgeProfiles.filter(
        (x) => x.forceTop && x.forceBottom && x.forceLeft && x.forceRight
      )[0];

      this.formGroup
        .get('duraformEdgeProfileId')
        .setValue(edgeProfile ? edgeProfile.id : null);

      if (!edgeProfile) {
        this.dialog.alert(
          'Missing Edge Profile',
          'Could not find SQUARE EDGE profile',
          null
        );
      }
    }
  };
}
