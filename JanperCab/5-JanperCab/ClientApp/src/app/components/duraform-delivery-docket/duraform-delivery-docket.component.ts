import { DeliveryDocketDuraformDto } from './../../_models/delivery-docket/DeliveryDocketDuraformDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { DialogService } from '../../_services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { EnquiryPaymentType } from 'src/app/_enums/EnquiryPaymentType';

@Component({
  selector: 'app-duraform-delivery-docket',
  templateUrl: 'duraform-delivery-docket.component.html',
})
export class DuraformDeliveryDocketComponent implements OnInit {
  @Input() deliveryDocket: DeliveryDocketDuraformDto;

  paymentType = EnquiryPaymentType;

  get mainCustomer(): CustomerDto {
    if (!this.deliveryDocket) {
      return null;
    }

    return this.deliveryDocket.manager ?? this.deliveryDocket.customer;
  }

  constructor(private dialog: DialogService) {}

  ngOnInit() {
    if (!this.deliveryDocket) {
      this.dialog.error('Delivery Docket Error - Missing Required Data!');
    }
  }
}
