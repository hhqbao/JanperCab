import { HingeHoleTypeService } from './../../_services/hinge-hole-type.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformOptionTypeService } from './../../_services/duraform-option-type.service';
import { DuraformDrawerTypeService } from './../../_services/duraform-drawer-type.service';
import { PantryDoorChairRailTypeService } from './../../_services/pantry-door-chair-rail-type.service';
import { DuraformArchService } from './../../_services/duraform-arch.service';
import { forkJoin } from 'rxjs';
import { DuraformOrderService } from './../../_services/duraform-order.service';
import { LayoutService } from './../../_services/layout.service';
import { DialogService } from './../../_services/dialog.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-order-step-two',
  templateUrl: 'duraform-order-step-two.component.html',
})
export class DuraformOrderStepTwoComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Output() finish = new EventEmitter();

  constructor(public order: DuraformOrderService) {}

  ngOnInit() {}

  onRepickClick = () => {
    this.goBack.emit();
  };

  onPreviewOrderClick = () => {
    this.finish.emit();
  };
}
