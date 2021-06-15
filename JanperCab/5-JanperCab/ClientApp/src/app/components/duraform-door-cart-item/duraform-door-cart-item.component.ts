import { Component, ElementRef, OnInit } from '@angular/core';
import { DuraformDoorDto } from 'src/app/_models/duraform-component/DuraformDoorDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentService } from 'src/app/_services/duraform-component.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformCartItemComponent } from '../duraform-cart-item/duraform-cart-item.component';

@Component({
  selector: 'app-duraform-door-cart-item',
  templateUrl: 'duraform-door-cart-item.component.html',
})
export class DuraformDoorCartItemComponent extends DuraformCartItemComponent<DuraformDoorDto> {
  constructor(
    public order: DuraformOrderService,
    public ef: ElementRef,
    public componentService: DuraformComponentService
  ) {
    super(componentService, ef, order);
  }
}
