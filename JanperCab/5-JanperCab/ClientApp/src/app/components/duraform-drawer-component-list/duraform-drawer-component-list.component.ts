import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';

@Component({
  selector: 'app-duraform-drawer-component-list',
  templateUrl: 'duraform-drawer-component-list.component.html',
})
export class DuraformDrawerComponentListComponent implements OnInit {
  constructor(
    public order: DuraformOrderService,
    public asset: DuraformAssetService
  ) {}

  ngOnInit() {}
}
