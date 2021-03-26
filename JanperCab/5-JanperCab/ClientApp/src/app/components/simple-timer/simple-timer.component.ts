import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-simple-timer',
  templateUrl: 'simple-timer.component.html',
})
export class SimpleTimerComponent implements OnInit, OnDestroy {
  @Input() startPoint: Date;

  intervalId: any;
  displayText: string;

  constructor() {}

  ngOnInit() {
    if (!this.startPoint) {
      this.displayText = 'Start Point Is Required!';
    } else {
      this.intervalId = setInterval(() => {
        const now = moment();
        let offsetInMilSeconds = now.diff(moment(this.startPoint));

        const days = Math.floor(offsetInMilSeconds / 86400000);
        offsetInMilSeconds -= days * 86400000;
        const hours = Math.floor(offsetInMilSeconds / 3600000);
        offsetInMilSeconds -= hours * 3600000;
        const minutes = Math.floor(offsetInMilSeconds / 60000);
        offsetInMilSeconds -= minutes * 60000;
        const seconds = Math.floor(offsetInMilSeconds / 1000);

        this.displayText = `${days > 0 ? days + ' days ' : ''}${(
          '0' + hours
        ).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
