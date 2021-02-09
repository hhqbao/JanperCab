import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { DuraformDoorFormComponent } from '../duraform-door-form/duraform-door-form.component';
import { DialogService } from './../../_services/dialog.service';
import { FormGroup } from '@angular/forms';

import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformCartItemComponent } from '../duraform-cart-item/duraform-cart-item.component';

@Component({
  selector: 'app-duraform-door-cart-item',
  templateUrl: 'duraform-door-cart-item.component.html',
})
export class DuraformDoorCartItemComponent extends DuraformCartItemComponent<DuraformDoorDto> {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    public ef: ElementRef,
    public componentService: DuraformComponentService
  ) {
    super(componentService, ef);
  }
}
