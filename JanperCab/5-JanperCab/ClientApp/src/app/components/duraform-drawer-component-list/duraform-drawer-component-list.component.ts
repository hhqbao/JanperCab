import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';

@Component({
  selector: 'app-duraform-drawer-component-list',
  templateUrl: 'duraform-drawer-component-list.component.html',
})
export class DuraformDrawerComponentListComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService
  ) {}

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    return this.duraformEnquiry.duraformDrawers;
  }

  ngOnInit() {}
}
