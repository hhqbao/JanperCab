import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { DuraformCartItemComponent } from '../duraform-cart-item/duraform-cart-item.component';

@Component({
  selector: 'app-duraform-drawer-cart-item',
  templateUrl: 'duraform-drawer-cart-item.component.html',
})
export class DuraformDrawerCartItemComponent extends DuraformCartItemComponent<DuraformDrawerDto> {
  constructor(
    public asset: DuraformAssetService,
    public ef: ElementRef,
    public componentService: DuraformComponentService,
    public order: DuraformOrderService
  ) {
    super(componentService, ef, order);
  }
}
