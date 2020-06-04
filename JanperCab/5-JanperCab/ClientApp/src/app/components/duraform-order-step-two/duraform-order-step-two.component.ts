import { DuraformOrderService } from './../../_services/duraform-order.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformEdgeProfileService } from 'src/app/_services/duraform-edge-profile.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-order-step-two',
  templateUrl: 'duraform-order-step-two.component.html',
})
export class DuraformOrderStepTwoComponent implements OnInit {
  edgeProfileList: DuraformEdgeProfileForList[] = [];

  constructor(
    private edgeProfileService: DuraformEdgeProfileService,
    private dialog: DialogService,
    private layout: LayoutService,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    this.loadEdgeProfiles();
  }

  private loadEdgeProfiles = () => {
    this.edgeProfileService.getAll().subscribe(
      (response) => {
        this.edgeProfileList = response;

        let defaultEdgeProfile: DuraformEdgeProfileForList;
        if (this.order.hasFixedEdgeProfile) {
          defaultEdgeProfile = this.edgeProfileList.find(
            (x) => x.id === this.order.selectedDesign.fixedEdgeProfileId
          );
        } else {
          defaultEdgeProfile = this.edgeProfileList.find(
            (x) => x.id === this.order.selectedDesign.defaultEdgeProfileId
          );
        }

        this.order.selectEdgeProfile(defaultEdgeProfile);
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  };

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.order.selectEdgeProfile(profile);
  };
}
