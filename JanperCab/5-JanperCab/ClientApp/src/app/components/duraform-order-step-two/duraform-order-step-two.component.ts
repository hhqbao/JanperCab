import { DuraformOptionTypeService } from './../../_services/duraform-option-type.service';
import { DuraformDrawerTypeForList } from './../../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformDrawerTypeService } from './../../_services/duraform-drawer-type.service';
import { PantryDoorChairRailTypeService } from './../../_services/pantry-door-chair-rail-type.service';
import { DuraformArchForList } from './../../_models/duraform-arch/DuraformArchForList';
import { DuraformArchService } from './../../_services/duraform-arch.service';
import { forkJoin } from 'rxjs';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformEdgeProfileService } from 'src/app/_services/duraform-edge-profile.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PantryDoorChairRailTypeForList } from 'src/app/_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformOptionType } from 'src/app/_models/duraform-option/DuraformOptionType';

@Component({
  selector: 'app-duraform-order-step-two',
  templateUrl: 'duraform-order-step-two.component.html',
})
export class DuraformOrderStepTwoComponent implements OnInit {
  @Output() finish = new EventEmitter();

  isLoaded = false;
  edgeProfileList: DuraformEdgeProfileForList[] = [];
  archList: DuraformArchForList[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  duraformOptionTypes: DuraformOptionType[] = [];

  constructor(
    private edgeProfileService: DuraformEdgeProfileService,
    private archService: DuraformArchService,
    private pantryDoorRailTypeService: PantryDoorChairRailTypeService,
    private drawerTypeService: DuraformDrawerTypeService,
    private optionTypeService: DuraformOptionTypeService,
    private dialog: DialogService,
    private layout: LayoutService,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();

    forkJoin([
      this.loadEdgeProfiles(),
      this.loadArches(),
      this.loadPantryDoorChairRailTypes(),
      this.loadDuraformDrawerTypes(),
      this.loadDuraformOptionTypes(),
    ]).subscribe(
      (responses) => {
        this.edgeProfileList = responses[0];
        this.archList = responses[1];
        this.pantryDoorChairRailTypes = responses[2];
        this.duraformDrawerTypes = responses[3];
        this.duraformOptionTypes = responses[4];

        this.initialDefaultEdgeProfile();
        this.layout.closeLoadingPanel();
        this.isLoaded = true;
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

  private loadPantryDoorChairRailTypes = () => {
    return this.pantryDoorRailTypeService.getAllActive();
  };

  private loadDuraformDrawerTypes = () => {
    return this.drawerTypeService.getAllActive();
  };

  private loadDuraformOptionTypes = () => {
    return this.optionTypeService.getAll();
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

  canCheckOut = (): boolean => {
    if (
      this.order.doors.length === 0 &&
      this.order.pantryDoors.length === 0 &&
      this.order.endPanels.length === 0 &&
      this.order.duraformDrawers.length === 0
    ) {
      return false;
    }

    return true;
  };

  onSelectProfile = (profile: DuraformEdgeProfileForList) => {
    this.order.selectEdgeProfile(profile);
  };

  onSelectArch = (arch: DuraformArchForList) => {
    this.order.selectArch(arch);
  };

  onCheckOutClick = () => {
    this.finish.emit();
  };
}
