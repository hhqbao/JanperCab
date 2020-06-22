import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformOptionTypeService } from './../../_services/duraform-option-type.service';
import { DuraformDrawerTypeService } from './../../_services/duraform-drawer-type.service';
import { PantryDoorChairRailTypeService } from './../../_services/pantry-door-chair-rail-type.service';
import { DuraformArchForList } from './../../_models/duraform-arch/DuraformArchForList';
import { DuraformArchService } from './../../_services/duraform-arch.service';
import { forkJoin } from 'rxjs';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-order-step-two',
  templateUrl: 'duraform-order-step-two.component.html',
})
export class DuraformOrderStepTwoComponent implements OnInit {
  @Output() finish = new EventEmitter();

  isLoaded = false;

  constructor(
    public asset: DuraformAssetService,
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
      this.loadArches(),
      this.loadPantryDoorChairRailTypes(),
      this.loadDuraformDrawerTypes(),
      this.loadDuraformOptionTypes(),
    ]).subscribe(
      (responses) => {
        this.asset.arches = responses[0];
        this.asset.pantryDoorChairRailTypes = responses[1];
        this.asset.duraformDrawerTypes = responses[2];
        this.asset.duraformOptionTypes = responses[3];

        this.layout.closeLoadingPanel();
        this.isLoaded = true;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  }

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
