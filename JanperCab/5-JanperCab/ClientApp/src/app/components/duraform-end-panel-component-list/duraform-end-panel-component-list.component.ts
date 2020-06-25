import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-end-panel-component-list',
  templateUrl: 'duraform-end-panel-component-list.component.html',
})
export class DuraformEndPanelComponentListComponent implements OnInit {
  constructor(
    public order: DuraformOrderService,
    public asset: DuraformAssetService
  ) {}

  ngOnInit() {}
}
