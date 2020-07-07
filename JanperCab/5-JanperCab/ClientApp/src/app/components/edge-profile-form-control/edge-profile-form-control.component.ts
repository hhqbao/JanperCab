import { FormGroup } from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edge-profile-form-control',
  templateUrl: 'edge-profile-form-control.component.html',
})
export class EdgeProfileFormControlComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {
    this.onSelectEdgeProfile();
  }

  onSelectEdgeProfile = () => {
    const edgeId = +this.formGroup.get('duraformEdgeProfileId').value;

    const selectedEdgeProfile = this.asset.edgeProfiles.find(
      (x) => x.id === edgeId
    );

    if (
      selectedEdgeProfile.forcedValuePerItem !== null &&
      selectedEdgeProfile.forcedValuePerItem !== undefined
    ) {
      this.formGroup
        .get('top')
        .setValue(selectedEdgeProfile.forcedValuePerItem);
      this.formGroup
        .get('bottom')
        .setValue(selectedEdgeProfile.forcedValuePerItem);
      this.formGroup
        .get('left')
        .setValue(selectedEdgeProfile.forcedValuePerItem);
      this.formGroup
        .get('right')
        .setValue(selectedEdgeProfile.forcedValuePerItem);
    } else {
      const { top, bottom, left, right } = this.formGroup.value;

      if (top && bottom && left && right) {
        this.formGroup.get('top').setValue(false);
        this.formGroup.get('bottom').setValue(false);
        this.formGroup.get('left').setValue(false);
        this.formGroup.get('right').setValue(false);
      }
    }
  };

  onEdgeTickChange = () => {
    const { top, bottom, left, right } = this.formGroup.value;

    if (top && bottom && left && right) {
      const edgeProfile = this.asset.edgeProfiles.filter(
        (x) => x.forcedValuePerItem === true
      )[0];

      this.formGroup
        .get('duraformEdgeProfileId')
        .setValue(
          edgeProfile
            ? edgeProfile.id
            : this.order.formData.selectedEdgeProfile.id
        );
    } else {
      const edgeId = +this.formGroup.get('duraformEdgeProfileId').value;

      const selectedEdgeProfile = this.asset.edgeProfiles.find(
        (x) => x.id === edgeId
      );

      if (selectedEdgeProfile.forcedValuePerItem === true) {
        this.formGroup
          .get('duraformEdgeProfileId')
          .setValue(this.order.formData.selectedEdgeProfile.id);
      }
    }

    this.onSelectEdgeProfile();
  };
}
