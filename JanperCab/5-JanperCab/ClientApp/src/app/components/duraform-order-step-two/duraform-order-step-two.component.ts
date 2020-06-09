import { DuraformDoorOptionForList } from './../../_models/duraform-door-option/DuraformDoorOptionForList';
import { DuraformDoorOptionService } from './../../_services/duraform-door-option.service';
import { DuraformDoorForCart } from './../../_models/duraform-door/DuraformDoorForCart';
import { DuraformArchForList } from './../../_models/duraform-arch/DuraformArchForList';
import { DuraformArchService } from './../../_services/duraform-arch.service';
import { forkJoin } from 'rxjs';
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
  archList: DuraformArchForList[] = [];
  doorOptions: DuraformDoorOptionForList[] = [];

  constructor(
    private edgeProfileService: DuraformEdgeProfileService,
    private archService: DuraformArchService,
    private doorOptionService: DuraformDoorOptionService,
    private dialog: DialogService,
    private layout: LayoutService,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();

    forkJoin([
      this.loadEdgeProfiles(),
      this.loadArches(),
      this.loadDuraformDoorOptions(),
    ]).subscribe(
      (responses) => {
        this.edgeProfileList = responses[0];
        this.archList = responses[1];
        this.doorOptions = responses[2];

        this.initialDefaultEdgeProfile();
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  }

  private loadEdgeProfiles = () => {
    return this.edgeProfileService.getAll();
  };

  private loadArches = () => {
    return this.archService.getAll();
  };

  private loadDuraformDoorOptions = () => {
    return this.doorOptionService.getAllActive();
  };

  private initialDefaultEdgeProfile = () => {
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
  };

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.order.selectEdgeProfile(profile);
  };

  onSelectArch = (arch: DuraformArchForList) => {
    this.order.selectArch(arch);
  };
}
