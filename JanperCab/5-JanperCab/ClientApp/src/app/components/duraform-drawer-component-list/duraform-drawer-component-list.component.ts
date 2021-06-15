import { DuraformDrawerDto } from './../../_models/duraform-component/DuraformDrawerDto';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformComponentList } from '../duraform-component-list/duraform-component-list.component';

@Component({
  selector: 'app-duraform-drawer-component-list',
  templateUrl: 'duraform-drawer-component-list.component.html',
})
export class DuraformDrawerComponentListComponent
  extends DuraformComponentList
  implements OnInit
{
  constructor(public order: DuraformOrderService) {
    super();
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    return this.duraformEnquiry.duraformDrawers;
  }

  ngOnInit() {}
}
