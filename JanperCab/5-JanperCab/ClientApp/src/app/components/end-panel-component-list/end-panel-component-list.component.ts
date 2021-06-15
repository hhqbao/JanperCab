import { AuthService } from './../../_services/auth.service';
import { DuraformEndPanelDto } from './../../_models/duraform-component/DuraformEndPanelDto';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformComponentList } from '../duraform-component-list/duraform-component-list.component';

@Component({
  selector: 'app-end-panel-component-list',
  templateUrl: 'end-panel-component-list.component.html',
})
export class EndPanelComponentListComponent
  extends DuraformComponentList
  implements OnInit
{
  constructor(
    public order: DuraformOrderService,
    public authService: AuthService
  ) {
    super();
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get endPanels(): DuraformEndPanelDto[] {
    return this.duraformEnquiry.endPanels;
  }

  ngOnInit() {}
}
