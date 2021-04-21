import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';

@Component({
  selector: 'app-end-panel-component-list',
  templateUrl: 'end-panel-component-list.component.html',
})
export class EndPanelComponentListComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService
  ) {}

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get endPanels(): DuraformEndPanelDto[] {
    return this.duraformEnquiry.endPanels;
  }

  ngOnInit() {}
}
