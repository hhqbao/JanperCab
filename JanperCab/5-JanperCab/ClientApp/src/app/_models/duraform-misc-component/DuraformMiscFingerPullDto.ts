import { DuraformMiscPriceFingerPullDto } from './../duraform-misc-price/DuraformMiscPriceFingerPullDto';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from 'src/app/_enums/DuraformMiscTypeEnum';
import { FingerPullTypeEnum } from './../../_enums/FingerPullTypeEnum';
import { DuraformMiscComponentDto } from './DuraformMiscComponentDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Expose } from 'class-transformer';

export class DuraformMiscFingerPullDto extends DuraformMiscComponentDto {
  type: FingerPullTypeEnum;
  isRaw: boolean;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscFingerPullDto, 3-Application';

    this.type = FingerPullTypeEnum.A;
    this.isRaw = true;
  }

  get miscType(): DuraformMiscTypeEnum {
    return DuraformMiscTypeEnum.FingerPull;
  }

  @Expose()
  update(formGroup: FormGroup) {
    const values = formGroup.value;
    this.quantity = values.quantity;
    this.type = values.type;
    this.isRaw = values.isRaw;
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const fingerPullPrices = DuraformAssetService.instance.miscPrices.filter(
      (x) => x instanceof DuraformMiscPriceFingerPullDto
    ) as DuraformMiscPriceFingerPullDto[];

    const unitPrice = this.isRaw
      ? fingerPullPrices.find((x) => !x.duraformWrapTypeId)
      : fingerPullPrices.find(
          (x) => x.duraformWrapTypeId === duraformEnquiry.duraformWrapTypeId
        );

    return unitPrice ? unitPrice.price : 0;
  }

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }

  @Expose()
  toString(): string {
    return `Finger Pull - Type ${FingerPullTypeEnum[this.type]} - ${
      this.isRaw ? 'Raw' : 'Pressed'
    }`;
  }
}
