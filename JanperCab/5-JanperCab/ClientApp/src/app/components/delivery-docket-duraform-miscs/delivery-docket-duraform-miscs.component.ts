import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { DuraformDrawerDto } from '../../_models/duraform-component/DuraformDrawerDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-duraform-miscs',
  templateUrl: 'delivery-docket-duraform-miscs.component.html',
})
export class DeliveryDocketDuraformMiscsComponent implements OnInit {
  @Input() miscs: DuraformMiscComponentDto[] = [];

  constructor() {}

  ngOnInit() {}
}
