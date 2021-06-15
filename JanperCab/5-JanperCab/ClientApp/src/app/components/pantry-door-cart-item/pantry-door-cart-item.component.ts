import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DuraformCartItemComponent } from '../duraform-cart-item/duraform-cart-item.component';

@Component({
  selector: 'app-pantry-door-cart-item',
  templateUrl: 'pantry-door-cart-item.component.html',
})
export class PantryDoorCartItemComponent extends DuraformCartItemComponent<DuraformPantryDoorDto> {
  constructor(
    public componentService: DuraformComponentService,
    public order: DuraformOrderService,
    public ef: ElementRef
  ) {
    super(componentService, ef, order);
  }
}
