import { DuraformProcessStep } from './../../_enums/DuraformProcessStep';
import { DuraformDoorProcessValue } from './../../_models/duraform-order-process/DuraformDoorProcessValue';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-process',
  templateUrl: 'duraform-process.component.html',
})
export class DuraformProcessComponent implements OnInit {
  @Input() processValue: DuraformDoorProcessValue;
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  constructor() {}

  ngOnInit() {}

  onStepOneClick = () => {
    this.processClick.emit(DuraformProcessStep.StepOne);
  };

  onStepTwoClick = () => {
    if (!this.processValue.stepOneValue) {
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
