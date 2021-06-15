import { DuraformMiscPriceLooseFoilDto } from './../duraform-misc-price/DuraformMiscPriceLooseFoilDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from 'src/app/_enums/DuraformMiscTypeEnum';
import { DuraformMiscComponentDto } from './DuraformMiscComponentDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import { Expose } from 'class-transformer';

export class DuraformMiscLooseFoilDto extends DuraformMiscComponentDto {
  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscLooseFoilDto, 3-Application';
  }

  get miscType(): DuraformMiscTypeEnum {
    return DuraformMiscTypeEnum.LooseFoil;
  }

  @Expose()
  update(formGroup: FormGroup) {
    const values = formGroup.value;

    this.quantity = values.quantity;
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const looseFoilPrices = DuraformAssetService.instance.miscPrices.filter(
      (x) => x instanceof DuraformMiscPriceLooseFoilDto
    ) as DuraformMiscPriceLooseFoilDto[];

    const unitPrice = looseFoilPrices.find(
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
    return 'Loose Foil';
  }
}
