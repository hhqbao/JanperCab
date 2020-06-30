import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformProcessStep } from 'src/app/_enums/DuraformProcessStep';
import { plainToClass } from 'class-transformer';

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

  ngOnInit() {
    const jsonString = JSON.stringify(this.order);
    const clonePlain = JSON.parse(jsonString);
    const clone = plainToClass(DuraformOrderService, clonePlain);
    clone.hingeHoleTypeId = null;

    console.log(jsonString);
    console.log(clone);
    console.log(this.order);
  }

  onEditClick = () => {
    this.processClick.emit(DuraformProcessStep.StepTwo);
  };
}
