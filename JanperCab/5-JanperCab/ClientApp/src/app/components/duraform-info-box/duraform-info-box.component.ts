import { DuraformDesignForOrderMenu } from './../../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { DuraformArchForList } from 'src/app/_models/duraform-arch/DuraformArchForList';

@Component({
  selector: 'app-duraform-info-box',
  templateUrl: 'duraform-info-box.component.html',
})
export class DuraformInfoBoxComponent implements OnInit {
  constructor(public order: DuraformOrderService) {}

  ngOnInit() {}
}
