import { EnquiryService } from 'src/app/_services/enquiry.service';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { Component, Input, OnInit } from '@angular/core';
import { DeliveryDocketDto } from 'src/app/_models/delivery-docket/DeliveryDocketDto';
import { DeliveryDocketType } from 'src/app/_enums/DeliveryDocketType';

@Component({
  selector: 'app-delivery-docket',
  templateUrl: 'delivery-docket.component.html',
})
export class DeliveryDocketComponent implements OnInit {
  @Input() enquiryId: number;

  isLoading = false;
  docketType = DeliveryDocketType;
  deliveryDocket: DeliveryDocketDto = null;

  constructor(
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private enquiryService: EnquiryService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.enquiryService.getDeliveryDocket(this.enquiryId).subscribe(
      (response) => {
        this.deliveryDocket = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Error Occured', error, () => {
          this.isLoading = false;
        });
      }
    );
  }
}
