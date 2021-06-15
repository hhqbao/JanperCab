import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformComponentList } from '../duraform-component-list/duraform-component-list.component';

@Component({
  selector: 'app-duraform-pantry-door-component-list',
  templateUrl: 'duraform-pantry-door-component-list.component.html',
})
export class DuraformPantryDoorComponentListComponent
  extends DuraformComponentList
  implements OnInit
{
  constructor(public order: DuraformOrderService) {
    super();
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    return this.duraformEnquiry.pantryDoors;
  }

  ngOnInit() {}
}
