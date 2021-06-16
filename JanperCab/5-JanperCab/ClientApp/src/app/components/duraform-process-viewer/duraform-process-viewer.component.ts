import { DialogService } from './../../_services/dialog.service';
import { CustomerService } from './../../_services/customer.service';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { ProcessDto } from 'src/app/_models/process/ProcessDto';

@Component({
  selector: 'app-duraform-process-viewer',
  templateUrl: 'duraform-process-viewer.component.html',
})
export class DuraformProcessViewerComponent implements OnInit {
  @Input() duraformEnquiry: DuraformEnquiryDto;

  @Output() closeBtnClick = new EventEmitter();

  customer: CustomerDto;

  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.customerService.getCustomer(this.duraformEnquiry.customerId).subscribe(
      (response) => {
        this.customer = response;
      },
      (error) => {
        this.dialogService.error(error);
      }
    );
  }

  onDisplayOnHoldComponents = (process: ProcessDto) => {
    let msg = '';

    process.onHoldComponents.forEach((x) => {
      msg += `${x.quantity} x ${x.description} </br>`;
    });

    this.dialogService.alert('On Hold Components', msg, null);
  };
}
