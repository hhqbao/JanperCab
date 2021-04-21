import { DuraformPriceService } from './../../_services/duraform-price.service';
import { EnquiryService } from './../../_services/enquiry.service';
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
import { forkJoin } from 'rxjs';
import { DuraformArchService } from 'src/app/_services/duraform-arch.service';
import { PantryDoorChairRailTypeService } from 'src/app/_services/pantry-door-chair-rail-type.service';
import { DuraformDrawerTypeService } from 'src/app/_services/duraform-drawer-type.service';
import { DuraformOptionTypeService } from 'src/app/_services/duraform-option-type.service';
import { HingeHoleService } from 'src/app/_services/hinge-hole.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  static instance: DuraformPageComponent;

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
    private enquiryService: EnquiryService,
    private serieService: DuraformSerieService,
    private designService: DuraformDesignService,
    private wrapTypeService: DuraformWrapTypeService,
    private wrapColorService: DuraformWrapColorService,
    private edgeProfileService: DuraformEdgeProfileService,
    private archService: DuraformArchService,
    private pantryRailService: PantryDoorChairRailTypeService,
    private drawerTypeService: DuraformDrawerTypeService,
    private optionTypeService: DuraformOptionTypeService,
    private hingeService: HingeHoleService,
    private componentService: DuraformComponentService,
    private priceService: DuraformPriceService
  ) {
    DuraformPageComponent.instance = this;
  }

  ngOnInit() {
    this.layout.showLoadingPanel();
    setTimeout(() => {
      this.layout.toggleLeftNav(true);
    });

    const observables = forkJoin({
      series: this.serieService.getAll(),
      designs: this.designService.getForOrderMenu(),
      edgeProfiles: this.edgeProfileService.getAll(),
      arches: this.archService.getAll(),
      wrapTypes: this.wrapTypeService.getAll(),
      railTypes: this.pantryRailService.getAllActive(),
      drawerTypes: this.drawerTypeService.getAllActive(),
      optTypes: this.optionTypeService.getAll(),
      hingeTypes: this.hingeService.getActiveTypes(),
      hingeStyles: this.hingeService.getActiveStyles(),
      wrapColors: this.wrapColorService.getAll(),
      componentTypes: this.componentService.getComponentTypes(),
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
        this.asset.hingeHoleStyles = responses.hingeStyles;
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
      const id = params.id;

      if (id) {
        this.enquiryService.getDuraformEnquiry(id).subscribe(
          (response) => {
            this.order.duraformEnquiry = response;

            const {
              isRoutingOnly,
              duraformSerieId,
              duraformWrapTypeId,
            } = this.order.duraformEnquiry;
            this.asset.loadPrices(
              isRoutingOnly,
              duraformSerieId,
              duraformWrapTypeId,
              () => {
                this.isLoadingAsset = false;
                this.displayedStep = this.duraformProcessStep.StepThree;
                this.layout.closeLoadingPanel();
              }
            );
          },
          (error) => {
            this.dialog.error(error);
            this.router.navigate(['/dashboard/duraform/orders']);
          }
        );
      } else {
        this.order.loadNewDraft();
        this.layout.closeLoadingPanel();
        this.isLoadingAsset = false;
      }
    });
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
