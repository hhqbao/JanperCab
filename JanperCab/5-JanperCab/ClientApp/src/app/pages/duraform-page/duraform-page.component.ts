import { DialogService } from './../../_services/dialog.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformProcessStep } from './../../_enums/DuraformProcessStep';
import { StepOneReturnValue } from '../../_models/duraform-order/StepOneReturnValue';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DuraformDesignService } from 'src/app/_services/duraform-design.service';
import { DuraformEdgeProfileService } from 'src/app/_services/duraform-edge-profile.service';
import { forkJoin } from 'rxjs';
import { DuraformArchService } from 'src/app/_services/duraform-arch.service';
import { PantryDoorChairRailTypeService } from 'src/app/_services/pantry-door-chair-rail-type.service';
import { DuraformDrawerTypeService } from 'src/app/_services/duraform-drawer-type.service';
import { DuraformOptionTypeService } from 'src/app/_services/duraform-option-type.service';
import { HingeHoleTypeService } from 'src/app/_services/hinge-hole-type.service';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  isLoadingAsset = true;
  duraformProcessStep = DuraformProcessStep;
  displayedStep = this.duraformProcessStep.StepOne;

  constructor(
    private layout: LayoutService,
    private dialog: DialogService,
    private asset: DuraformAssetService,
    private order: DuraformOrderService,
    private duraformSerieService: DuraformSerieService,
    private duraformDesignService: DuraformDesignService,
    private edgeProfileService: DuraformEdgeProfileService,
    private archService: DuraformArchService,
    private pantryDoorRailTypeService: PantryDoorChairRailTypeService,
    private drawerTypeService: DuraformDrawerTypeService,
    private optionTypeService: DuraformOptionTypeService,
    private hingeHoleTypeService: HingeHoleTypeService
  ) {
    this.order.reset();
  }

  ngOnInit() {
    this.layout.toggleLeftNav(true);
    this.layout.showLoadingPanel();

    forkJoin(
      forkJoin([
        this.loadSeries(),
        this.loadDuraformDesigns(),
        this.loadEdgeProfiles(),
        this.loadArches(),
      ]),
      forkJoin([
        this.loadPantryDoorChairRailTypes(),
        this.loadDuraformDrawerTypes(),
        this.loadDuraformOptionTypes(),
        this.loadHingeHoleTypes(),
      ])
    ).subscribe(
      (responses) => {
        this.asset.duraformSeries = responses[0][0];
        this.asset.duraformDesigns = responses[0][1];
        this.asset.edgeProfiles = responses[0][2];
        this.asset.arches = responses[0][3];
        this.asset.pantryDoorChairRailTypes = responses[1][0];
        this.asset.duraformDrawerTypes = responses[1][1];
        this.asset.duraformOptionTypes = responses[1][2];
        this.asset.hingeHoleTypes = responses[1][3];
        this.layout.closeLoadingPanel();
        this.isLoadingAsset = false;
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  }

  private loadSeries = () => {
    return this.duraformSerieService.getAll();
  };

  private loadDuraformDesigns = () => {
    return this.duraformDesignService.getForOrderMenu();
  };

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

  private loadHingeHoleTypes = () => {
    return this.hingeHoleTypeService.getAllActive();
  };

  onProcessClick = (step: DuraformProcessStep) => {
    this.displayedStep = step;
  };

  onStepOneFinish = (returnValue: StepOneReturnValue) => {
    this.order.submitStepOne(returnValue);
    this.displayedStep = this.duraformProcessStep.StepTwo;
  };

  onStepTwoFinish = () => {
    this.displayedStep = this.duraformProcessStep.StepThree;
  };

  onStepTwoGoBack = () => {
    this.displayedStep = DuraformProcessStep.StepOne;
  };
}
