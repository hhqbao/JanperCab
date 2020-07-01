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

  constructor(public order: DuraformOrderService) {
    this.selectedDisplayOption = this.displayOptions.all;
  }

  ngOnInit() {}

  onEditClick = () => {
    this.processClick.emit(DuraformProcessStep.StepTwo);
  };
}
