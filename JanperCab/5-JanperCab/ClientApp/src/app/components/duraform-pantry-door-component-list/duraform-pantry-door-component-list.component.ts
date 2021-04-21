import { DuraformComponentService } from './../../_services/duraform-component.service';
import { DuraformPantryDoorDto } from './../../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Component, OnInit, Input } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';

@Component({
  selector: 'app-duraform-pantry-door-component-list',
  templateUrl: 'duraform-pantry-door-component-list.component.html',
})
export class DuraformPantryDoorComponentListComponent implements OnInit {
  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService
  ) {}

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    return this.duraformEnquiry.pantryDoors;
  }

  ngOnInit() {}
}
