import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-end-panel-component-list',
  templateUrl: 'end-panel-component-list.component.html',
})
export class EndPanelComponentListComponent implements OnInit {
  @Input() endPanels: DuraformEndPanelDto[] = [];

  constructor(public asset: DuraformAssetService) {}

  ngOnInit() {}
}
