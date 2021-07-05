import { DuraformComponentTypeEnum } from './../../_enums/DuraformComponentTypeEnum';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DuraformEdgeProfileDto } from './../duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Expose } from 'class-transformer';
import * as _ from 'lodash';

export abstract class DuraformComponentDto {
  $type: string;
  id: number;
  quantity: number;
  height: number;
  width: number;
  duraformEdgeProfileId: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;
  sortNumber: number;

  unitPrice: number;
  subTotal: number;
  totalDiscount: number;
  totalPrice: number;

  duraformEdgeProfile: DuraformEdgeProfileDto;

  abstract get componentType(): DuraformComponentTypeEnum;
  abstract get totalHeight(): number;
  abstract get totalWidth(): number;
  abstract getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number;
  abstract calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void;

  @Expose()
  update(formValue: any) {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.duraformEdgeProfileId = formValue.duraformEdgeProfileId;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.note = formValue.note;

    this.duraformEdgeProfile = DuraformAssetService.instance.getEdgeProfile(
      this.duraformEdgeProfileId
    );
  }

  @Expose()
  setEdgeProfile(profile: DuraformEdgeProfileDto) {
    this.duraformEdgeProfileId = profile.id;
    this.duraformEdgeProfile = profile;

    const { forceTop, forceBottom, forceLeft, forceRight } = profile;

    if (forceTop === true || forceTop === false) {
      this.top = forceTop;
    }

    if (forceBottom === true || forceBottom === false) {
      this.bottom = forceBottom;
    }

    if (forceLeft === true || forceLeft === false) {
      this.left = forceLeft;
    }

    if (forceRight === true || forceRight === false) {
      this.right = forceRight;
    }
  }

  @Expose()
  calculateTotal(duraformEnquiry: DuraformEnquiryDto): void {
    this.subTotal = this.quantity * this.unitPrice;
    this.totalDiscount = _.round(
      (this.subTotal * duraformEnquiry.discountRate) / 100,
      2
    );

    this.totalPrice = this.subTotal - this.totalDiscount;
  }
}
