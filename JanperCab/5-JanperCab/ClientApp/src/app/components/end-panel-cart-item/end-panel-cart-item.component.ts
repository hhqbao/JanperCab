import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DuraformCartItemComponent } from '../duraform-cart-item/duraform-cart-item.component';

@Component({
  selector: 'app-end-panel-cart-item',
  templateUrl: 'end-panel-cart-item.component.html',
})
export class EndPanelCartItemComponent extends DuraformCartItemComponent<DuraformEndPanelDto> {
  constructor(
    public ef: ElementRef,
    public componentService: DuraformComponentService,
    public order: DuraformOrderService
  ) {
    super(componentService, ef, order);
  }
}
