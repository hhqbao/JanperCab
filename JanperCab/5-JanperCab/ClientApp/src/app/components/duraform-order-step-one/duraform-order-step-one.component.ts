import { DuraformWrapTypeForSelection } from './../../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { StepOneReturnValue } from './../../_models/duraform-order-process/StepOneReturnValue';
import { DuraformWrapColorForSelection } from './../../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';
import { DuraformSerieForList } from 'src/app/_models/duraform-serie/DuraformSerieForList';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DuraformDoorService } from 'src/app/_services/duraform-door.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-duraform-order-step-one',
  templateUrl: 'duraform-order-step-one.component.html',
})
export class DuraformOrderStepOneComponent implements OnInit {
  @Output() finish = new EventEmitter<StepOneReturnValue>();

  duraformDoors: DuraformDoorForOrderMenu[] = [];
  duraformSeries: DuraformSerieForList[] = [];

  selectedDuraformDoor: DuraformDoorForOrderMenu = null;
  showColorSelector = false;

  constructor(
    private layout: LayoutService,
    private duraformSerieService: DuraformSerieService,
    private duraformDoorService: DuraformDoorService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    forkJoin([this.loadSeries(), this.loadDuraformDoors()]).subscribe(
      (responses) => {
        this.duraformSeries = responses[0];
        this.duraformDoors = responses[1];
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

  private loadDuraformDoors = () => {
    return this.duraformDoorService.getForOrderMenu();
  };

  onSelectDoor = (selectedDoor: DuraformDoorForOrderMenu) => {
    this.selectedDuraformDoor = selectedDoor;
    this.showColorSelector = true;
  };

  onPickColor = (color: DuraformWrapColorForSelection) => {
    const selectedSerie = this.duraformSeries.find(
      (x) => x.id === this.selectedDuraformDoor.duraformSerieId
    );

    const selectedWrapType: DuraformWrapTypeForSelection = {
      id: color.duraformWrapTypeId,
      name: color.duraformWrapTypeName,
    };

    const returnValue: StepOneReturnValue = {
      door: this.selectedDuraformDoor,
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
      (x) => x.id === this.selectedDuraformDoor.duraformSerieId
    );

    const returnValue: StepOneReturnValue = {
      door: this.selectedDuraformDoor,
      serie: selectedSerie,
      isRoutingOnly: true,
      wrapType: null,
      wrapColor: null,
    };

    this.showColorSelector = false;
    this.finish.emit(returnValue);
  };

  onCancelColorSelection = () => {
    this.selectedDuraformDoor = null;
    this.showColorSelector = false;
  };
}
