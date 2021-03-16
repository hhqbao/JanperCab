import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { FormGroup } from '@angular/forms';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DialogService } from './../../_services/dialog.service';
import { DuraformComponentDto } from 'src/app/_models/duraform-component/DuraformComponentDto';
import { Directive, Injectable } from '@angular/core';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';

@Directive()
export abstract class DuraformTabComponent {
  canSelectCartItem = true;
  duraformEnquiry: DuraformEnquiryDto;

  constructor(
    protected dialog: DialogService,
    protected order: DuraformOrderService
  ) {
    this.duraformEnquiry = this.order.duraformEnquiry;
  }

  abstract onAddComponent(formGroup: FormGroup): void;

  onRemoveComponent = (component: DuraformComponentDto) => {
    this.dialog.confirm('Remove Component', 'Are you sure?', () => {
      this.canSelectCartItem = true;
      this.order.removeComponent(component);
    });
  };

  onRemoveMisc = (miscItem: DuraformMiscComponentDto) => {};
}
