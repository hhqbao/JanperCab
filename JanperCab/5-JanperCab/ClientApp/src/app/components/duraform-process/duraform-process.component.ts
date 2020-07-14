import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformProcessStep } from './../../_enums/DuraformProcessStep';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-duraform-process',
  templateUrl: 'duraform-process.component.html',
})
export class DuraformProcessComponent implements OnInit {
  @Input() currentDisplayStep: DuraformProcessStep;
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  constructor(
    private dialog: DialogService,
    public order: DuraformOrderService
  ) {}

  ngOnInit() {}

  onStepOneClick = () => {
    this.processClick.emit(DuraformProcessStep.StepOne);
  };

  onStepTwoClick = () => {
    if (!this.order.selectedDesign) {
      this.dialog.error('Please select a door to process.');
      return;
    }

    this.processClick.emit(DuraformProcessStep.StepTwo);
  };

  onStepThreeClick = () => {
    this.processClick.emit(DuraformProcessStep.StepThree);
  };

  onStepFourClick = () => {
    this.processClick.emit(DuraformProcessStep.StepFour);
  };
}
