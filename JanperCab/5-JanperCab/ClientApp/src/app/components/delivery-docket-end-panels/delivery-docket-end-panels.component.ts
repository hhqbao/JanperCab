import { DuraformEdgeProfileForList } from './../../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-docket-end-panels',
  templateUrl: 'delivery-docket-end-panels.component.html',
})
export class DeliveryDocketEndPanelsComponent implements OnInit {
  @Input() endPanels: DuraformEndPanelDto[] = [];

  constructor() {}

  ngOnInit() {}
}
