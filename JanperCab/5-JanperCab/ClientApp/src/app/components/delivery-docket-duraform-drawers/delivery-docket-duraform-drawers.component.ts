import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-duraform-drawers',
  templateUrl: 'delivery-docket-duraform-drawers.component.html',
})
export class DeliveryDocketDuraformDrawersComponent implements OnInit {
  @Input() drawers: DuraformDrawerDto[] = [];

  constructor() {}

  ngOnInit() {}
}
