import { DuraformDraftService } from './../../_services/duraform-draft.service';
import { DuraformJobService } from './../../_services/duraform-job.service';
import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformWrapColorService } from './../../_services/duraform-wrap-color.service';
import { DuraformWrapTypeService } from './../../_services/duraform-wrap-type.service';
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
import { forkJoin, Observable, ObservableInput } from 'rxjs';
import { DuraformArchService } from 'src/app/_services/duraform-arch.service';
import { PantryDoorChairRailTypeService } from 'src/app/_services/pantry-door-chair-rail-type.service';
import { DuraformDrawerTypeService } from 'src/app/_services/duraform-drawer-type.service';
import { DuraformOptionTypeService } from 'src/app/_services/duraform-option-type.service';
import { HingeHoleTypeService } from 'src/app/_services/hinge-hole-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  isLoadingAsset = true;
  duraformProcessStep = DuraformProcessStep;
  displayedStep = this.duraformProcessStep.StepOne;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private layout: LayoutService,
    private dialog: DialogService,
    private asset: DuraformAssetService,
    private order: DuraformOrderService,
    private draftService: DuraformDraftService,
    private jobService: DuraformJobService,
    private duraformSerieService: DuraformSerieService,
    private duraformDesignService: DuraformDesignService,
    private wrapTypeService: DuraformWrapTypeService,
    private wrapColorService: DuraformWrapColorService,
    private edgeProfileService: DuraformEdgeProfileService,
    private archService: DuraformArchService,
    private pantryDoorRailTypeService: PantryDoorChairRailTypeService,
    private drawerTypeService: DuraformDrawerTypeService,
    private optionTypeService: DuraformOptionTypeService,
    private hingeHoleTypeService: HingeHoleTypeService,
    private componentService: DuraformComponentService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    setTimeout(() => {
      this.layout.toggleLeftNav(true);
    });

    const observables = forkJoin({
      series: this.loadSeries(),
      designs: this.loadDuraformDesigns(),
      edgeProfiles: this.loadEdgeProfiles(),
      arches: this.loadArches(),
      wrapTypes: this.loadWrapTypes(),
      railTypes: this.loadPantryDoorChairRailTypes(),
      drawerTypes: this.loadDuraformDrawerTypes(),
      optTypes: this.loadDuraformOptionTypes(),
      hingeTypes: this.loadHingeHoleTypes(),
      wrapColors: this.loadWrapColors(),
      componentTypes: this.loadComponentTypes(),
    });

    observables.subscribe(
      (responses) => {
        this.asset.duraformSeries = responses.series;
        this.asset.duraformDesigns = responses.designs;
        this.asset.edgeProfiles = responses.edgeProfiles;
        this.asset.arches = responses.arches;
        this.asset.duraformWrapTypes = responses.wrapTypes;
        this.asset.duraformWrapColors = responses.wrapColors;
        this.asset.pantryDoorChairRailTypes = responses.railTypes;
        this.asset.duraformDrawerTypes = responses.drawerTypes;
        this.asset.duraformOptionTypes = responses.optTypes;
        this.asset.hingeHoleTypes = responses.hingeTypes;
        this.asset.componentTypes = responses.componentTypes;

        this.loadDuraformForm();
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  }

  private loadDuraformForm = () => {
    this.route.params.subscribe((params) => {
      const type = +params.type;
      const id = params.id;

      if (type && id) {
        switch (type) {
          case DuraformOrderTypeKey.Draft:
            this.draftService.get(id).subscribe(
              (response) => {
                this.order.form = response;
                this.isLoadingAsset = false;
                this.displayedStep = DuraformProcessStep.StepThree;
                this.layout.closeLoadingPanel();
              },
              (error) => {
                this.dialog.error(error);
                this.dialog.error('Failed Loading Draft!');
                this.router.navigate(['/dashboard']);
              }
            );
            break;
          case DuraformOrderTypeKey.Quote:
            break;
          case DuraformOrderTypeKey.Order:
            this.jobService.get(id).subscribe(
              (response) => {
                this.order.form = response;
                this.isLoadingAsset = false;
                this.displayedStep = DuraformProcessStep.StepThree;
                this.layout.closeLoadingPanel();
              },
              (error) => {
                this.dialog.error(error);
                this.dialog.error('Failed Loading Order');
                this.router.navigate(['/dashboard/duraform/orders']);
              }
            );
            break;
        }
      } else {
        this.order.loadNewDraft();
        this.layout.closeLoadingPanel();
        this.isLoadingAsset = false;
      }
    });
  };

  private loadSeries = () => {
    return this.duraformSerieService.getAll();
  };

  private loadDuraformDesigns = () => {
    return this.duraformDesignService.getForOrderMenu();
  };

  private loadWrapTypes = () => {
    return this.wrapTypeService.getAll();
  };

  private loadWrapColors = () => {
    return this.wrapColorService.getAll();
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

  private loadComponentTypes = () => {
    return this.componentService.getComponentTypes();
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
