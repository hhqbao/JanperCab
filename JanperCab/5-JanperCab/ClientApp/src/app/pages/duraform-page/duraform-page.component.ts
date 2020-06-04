import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformProcessStep } from './../../_enums/DuraformProcessStep';
import { StepOneReturnValue } from '../../_models/duraform-order/StepOneReturnValue';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/layout.service';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  duraformProcessStep = DuraformProcessStep;
  loadedSteps: DuraformProcessStep[] = [DuraformProcessStep.StepOne];
  displayedStep = DuraformProcessStep.StepOne;

  constructor(
    private layout: LayoutService,
    private order: DuraformOrderService
  ) {
    this.order.reset();
  }

  ngOnInit() {
    this.layout.toggleLeftNav(true);
  }

  onProcessClick = (step: DuraformProcessStep) => {
    this.displayedStep = step;
  };

  onStepOneFinish = (returnValue: StepOneReturnValue) => {
    this.order.submitStepOne(returnValue);

    if (this.loadedSteps.includes(DuraformProcessStep.StepTwo)) {
      this.loadedSteps = [DuraformProcessStep.StepOne];

      setTimeout(() => {
        this.loadedSteps.push(DuraformProcessStep.StepTwo);
      }, 100);
    } else {
      this.loadedSteps.push(DuraformProcessStep.StepTwo);
    }

    this.displayedStep = this.duraformProcessStep.StepTwo;
  };
}
