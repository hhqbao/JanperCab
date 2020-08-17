import { DuraformOrderDto } from './../../_models/duraform-order/DuraformOrderDto';
import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { DialogService } from './../../_services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { DeliveryDocketDto } from 'src/app/_models/pdf-form-model/DeliveryDocketDto';

@Component({
  selector: 'app-delivery-docket',
  templateUrl: 'delivery-docket.component.html',
})
export class DeliveryDocketComponent implements OnInit {
  @Input() data: DeliveryDocketDto;

  orderType = DuraformOrderTypeKey;
  constructor(private dialog: DialogService) {}

  ngOnInit() {
    if (!this.data) {
      this.dialog.error('Delivery Docket Error - Missing Required Data!');
    }
  }

  get orderNumber(): number {
    if (this.data.duraformForm instanceof DuraformOrderDto) {
      return (this.data.duraformForm as DuraformOrderDto).orderNumber;
    } else {
      return null;
    }
  }
}
