import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from './../../_enums/DuraformMiscTypeEnum';
import * as _ from 'lodash';

export abstract class DuraformMiscComponentDto {
  $type: string;
  id: number;
  duraformEnquiryId: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;

  constructor() {
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscComponentDto, 3-Application';
  }

  abstract get miscType(): DuraformMiscTypeEnum;
  abstract update(formGroup: FormGroup): void;
  abstract getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number;
  abstract calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void;
  abstract toString(): string;

  calculateTotal(duraformEnquiry: DuraformEnquiryDto): void {
    this.subTotal = this.unitPrice * this.quantity;

    this.totalDiscount = _.round(
      (this.subTotal * duraformEnquiry.discountRate) / 100,
      2
    );

    this.totalPrice = this.subTotal - this.totalDiscount;
  }
}
