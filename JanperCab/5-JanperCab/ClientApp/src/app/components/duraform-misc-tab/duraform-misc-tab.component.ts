import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { DialogService } from './../../_services/dialog.service';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-misc-tab',
  templateUrl: 'duraform-misc-tab.component.html',
})
export class DuraformMiscTabComponent implements OnInit {
  canSelectCartItem = true;

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  constructor(
    public order: DuraformOrderService,
    private dialog: DialogService
  ) {}

  ngOnInit() {}

  onRemoveMiscComponent = (miscComponent: DuraformMiscComponentDto) => {
    this.dialog.confirm('Remove Misc Component', 'Are you sure?', () => {
      this.canSelectCartItem = true;
      this.order.removeComponent(miscComponent);
    });
  };
}
