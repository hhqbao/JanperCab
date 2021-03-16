import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-duraform-doors',
  templateUrl: 'delivery-docket-duraform-doors.component.html',
})
export class DeliveryDocketDuraformDoorsComponent implements OnInit {
  @Input() doors: DuraformDoorDto[] = [];

  constructor() {}

  ngOnInit() {}
}
