import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { Component, OnInit } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import * as _ from 'lodash';
import { DuraformComponentList } from '../duraform-component-list/duraform-component-list.component';

@Component({
  selector: 'app-duraform-misc-component-list',
  templateUrl: 'duraform-misc-component-list.component.html',
})
export class DuraformMiscComponentListComponent
  extends DuraformComponentList
  implements OnInit
{
  constructor(public order: DuraformOrderService) {
    super();
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get miscComponents(): DuraformMiscComponentDto[] {
    return this.duraformEnquiry.miscComponents;
  }

  get totalQuantity(): number {
    let total = 0;

    this.miscComponents.forEach((x) => (total += x.quantity));

    return total;
  }

  ngOnInit() {}

  getSum = (col: string): number => {
    let value = 0;

    this.miscComponents.forEach((x) => (value += x[col]));

    return _.round(value, 2);
  };
}
