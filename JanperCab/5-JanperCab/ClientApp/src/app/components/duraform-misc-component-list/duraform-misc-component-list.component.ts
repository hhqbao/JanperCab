import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformComponentService } from '../../_services/duraform-component.service';
import { DuraformDrawerDto } from '../../_models/duraform-component/DuraformDrawerDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import * as _ from 'lodash';

@Component({
  selector: 'app-duraform-misc-component-list',
  templateUrl: 'duraform-misc-component-list.component.html',
})
export class DuraformMiscComponentListComponent implements OnInit {
  constructor(public order: DuraformOrderService) {}

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
