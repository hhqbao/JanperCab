import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from 'src/app/_enums/DuraformMiscTypeEnum';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import { CapMouldSizeEnum } from './../../_enums/CapMouldSizeEnum';
import { DuraformMiscComponentDto } from './DuraformMiscComponentDto';
import { DuraformMiscPriceCapMouldDto } from '../duraform-misc-price/DuraformMiscPriceCapMouldDto';
import { Expose } from 'class-transformer';
import * as _ from 'lodash';

export class DuraformMiscCapMouldDto extends DuraformMiscComponentDto {
  size: CapMouldSizeEnum;
  isRaw: boolean;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscCapMouldDto, 3-Application';

    this.size = CapMouldSizeEnum.SizeA;
    this.isRaw = true;
  }

  get miscType(): DuraformMiscTypeEnum {
    return DuraformMiscTypeEnum.CapMould;
  }

  @Expose()
  update(formGroup: FormGroup) {
    const values = formGroup.value;
    this.quantity = values.quantity;
    this.size = values.size;
    this.isRaw = values.isRaw;
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const mouldPrices = DuraformAssetService.instance.miscPrices.filter(
      (x) => x instanceof DuraformMiscPriceCapMouldDto
    ) as DuraformMiscPriceCapMouldDto[];

    const unitPrice = this.isRaw
      ? mouldPrices.find((x) => !x.duraformWrapTypeId)
      : mouldPrices.find(
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
    return `Cap Mould - ${this.size}mm - ${this.isRaw ? 'Raw' : 'Pressed'}`;
  }
}
