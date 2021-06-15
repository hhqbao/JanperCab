import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformDoorDto } from './../../_models/duraform-component/DuraformDoorDto';
import { Component, OnInit } from '@angular/core';
import { DuraformComponentList } from '../duraform-component-list/duraform-component-list.component';

@Component({
  selector: 'app-duraform-door-component-list',
  templateUrl: 'duraform-door-component-list.component.html',
})
export class DuraformDoorComponentListComponent
  extends DuraformComponentList
  implements OnInit
{
  constructor(public order: DuraformOrderService) {
    super();
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get duraformDoors(): DuraformDoorDto[] {
    return this.duraformEnquiry.duraformDoors;
  }

  ngOnInit() {}
}
