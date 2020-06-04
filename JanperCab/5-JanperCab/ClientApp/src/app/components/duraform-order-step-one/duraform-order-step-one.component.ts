import { DuraformDesignService } from './../../_services/duraform-design.service';
import { DuraformDesignForOrderMenu } from '../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformWrapTypeForSelection } from './../../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { StepOneReturnValue } from '../../_models/duraform-order/StepOneReturnValue';
import { DuraformWrapColorForSelection } from './../../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DuraformSerieForList } from 'src/app/_models/duraform-serie/DuraformSerieForList';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-duraform-order-step-one',
  templateUrl: 'duraform-order-step-one.component.html',
})
export class DuraformOrderStepOneComponent implements OnInit {
  @Output() finish = new EventEmitter<StepOneReturnValue>();

  duraformDesigns: DuraformDesignForOrderMenu[] = [];
  duraformSeries: DuraformSerieForList[] = [];

  selectedDuraformDesign: DuraformDesignForOrderMenu = null;
  showColorSelector = false;

  constructor(
    private layout: LayoutService,
    private duraformSerieService: DuraformSerieService,
    private duraformDesignService: DuraformDesignService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    forkJoin([this.loadSeries(), this.loadDuraformDesigns()]).subscribe(
      (responses) => {
        this.duraformSeries = responses[0];
        this.duraformDesigns = responses[1];
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  }

  private loadSeries = () => {
    return this.duraformSerieService.getAll();
  };

  private loadDuraformDesigns = () => {
    return this.duraformDesignService.getForOrderMenu();
  };

  onSelectDesign = (selectedDesign: DuraformDesignForOrderMenu) => {
    this.selectedDuraformDesign = selectedDesign;
    this.showColorSelector = true;
  };

  onPickColor = (color: DuraformWrapColorForSelection) => {
    const selectedSerie = this.duraformSeries.find(
      (x) => x.id === this.selectedDuraformDesign.duraformSerieId
    );

    const selectedWrapType: DuraformWrapTypeForSelection = {
      id: color.duraformWrapTypeId,
      name: color.duraformWrapTypeName,
    };

    const returnValue: StepOneReturnValue = {
      design: { ...this.selectedDuraformDesign },
      serie: selectedSerie,
      isRoutingOnly: false,
      wrapType: selectedWrapType,
      wrapColor: color,
    };

    this.showColorSelector = false;
    this.finish.emit(returnValue);
  };

  onRoutingPick = () => {
    const selectedSerie = this.duraformSeries.find(
      (x) => x.id === this.selectedDuraformDesign.duraformSerieId
    );

    const returnValue: StepOneReturnValue = {
      design: { ...this.selectedDuraformDesign },
      serie: selectedSerie,
      isRoutingOnly: true,
      wrapType: null,
      wrapColor: null,
    };

    this.showColorSelector = false;
    this.finish.emit(returnValue);
  };

  onCancelColorSelection = () => {
    this.selectedDuraformDesign = null;
    this.showColorSelector = false;
  };
}
