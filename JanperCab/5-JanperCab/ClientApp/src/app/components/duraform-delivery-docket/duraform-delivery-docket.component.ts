import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';
import { DialogService } from '../../_services/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';

@Component({
  selector: 'app-duraform-delivery-docket',
  templateUrl: 'duraform-delivery-docket.component.html',
})
export class DuraformDeliveryDocketComponent implements OnInit {
  @Input() duraformEnquiry: DuraformEnquiryDto;

  enquiryType = EnquiryTypeEnum;

  constructor(private dialog: DialogService) {}

  ngOnInit() {
    if (!this.duraformEnquiry) {
      this.dialog.error('Delivery Docket Error - Missing Required Data!');
    }
  }
}
