import { DialogService } from './../../_services/dialog.service';
import { CustomerService } from './../../_services/customer.service';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-process-viewer',
  templateUrl: 'duraform-process-viewer.component.html',
})
export class DuraformProcessViewerComponent implements OnInit {
  @Input() duraformEnquiry: DuraformEnquiryDto;

  @Output() closeBtnClick = new EventEmitter();

  cabinetMaker: CabinetMakerDto;

  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.customerService
      .getCabinetMaker(this.duraformEnquiry.cabinetMakerId)
      .subscribe(
        (response) => {
          this.cabinetMaker = response;
        },
        (error) => {
          this.dialogService.error(error);
        }
      );
  }
}
