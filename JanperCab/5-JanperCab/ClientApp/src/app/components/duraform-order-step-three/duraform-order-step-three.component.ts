import { DialogService } from 'src/app/_services/dialog.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformProcessStep } from 'src/app/_enums/DuraformProcessStep';

@Component({
  selector: 'app-duraform-order-step-three',
  templateUrl: 'duraform-order-step-three.component.html',
})
export class DuraformOrderStepThreeComponent implements OnInit {
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  selectedDisplayOption = null;
  displayOptions = {
    all: 'All',
    doors: 'Doors & Panels',
    pantryDoors: 'Pantry Doors',
    ibBacks: 'IB Backs',
    drawers: 'Drawers',
  };

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private layout: LayoutService,
    private dialog: DialogService
  ) {
    this.selectedDisplayOption = this.displayOptions.all;
  }

  ngOnInit() {}

  onEditClick = () => {
    this.processClick.emit(DuraformProcessStep.StepTwo);
  };

  onSaveDraft = () => {
    this.layout.showLoadingPanel();
    this.order.saveDraft().subscribe(
      (_) => {
        this.layout.closeLoadingPanel();
        this.dialog.success('Draft has been saved!');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };
}
