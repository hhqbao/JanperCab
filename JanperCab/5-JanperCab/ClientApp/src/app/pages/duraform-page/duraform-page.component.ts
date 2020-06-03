import { DuraformProcessStep } from './../../_enums/DuraformProcessStep';
import { DuraformDoorProcessValue } from './../../_models/duraform-order-process/DuraformDoorProcessValue';
import { StepOneReturnValue } from './../../_models/duraform-order-process/StepOneReturnValue';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/layout.service';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  processValue = new DuraformDoorProcessValue();
  displayedStep = DuraformProcessStep.StepOne;

  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.toggleLeftNav(true);
  }

  displayStepOne = () => {
    return this.displayedStep === DuraformProcessStep.StepOne;
  };

  onProcessClick = (step: DuraformProcessStep) => {
    this.displayedStep = step;
  };

  onStepOneFinish = (returnValue: StepOneReturnValue) => {
    this.processValue.stepOneValue = returnValue;
  };
}
