import { DuraformOrderService } from './../../_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';

@Component({
  selector: 'app-duraform-info-box',
  templateUrl: 'duraform-info-box.component.html',
})
export class DuraformInfoBoxComponent implements OnInit {
  duraformEnquiry: DuraformEnquiryDto;

  constructor(public order: DuraformOrderService) {}

  ngOnInit() {
    this.duraformEnquiry = this.order.duraformEnquiry;
  }
}
