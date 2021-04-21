import { DuraformComponentService } from 'src/app/_services/duraform-component.service';
import { DuraformMiscPriceLooseFoilDto } from './../duraform-misc-price/DuraformMiscPriceLooseFoilDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from 'src/app/_enums/DuraformMiscTypeEnum';
import { DuraformMiscComponentDto } from './DuraformMiscComponentDto';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';

export class DuraformMiscLooseFoilDto extends DuraformMiscComponentDto {
  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscLooseFoilDto, 3-Application';
  }

  get miscType(): DuraformMiscTypeEnum {
    return DuraformMiscTypeEnum.LooseFoil;
  }

  update(formGroup: FormGroup) {
    const values = formGroup.value;

    this.quantity = values.quantity;
  }

  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const looseFoilPrices = DuraformAssetService.instance.miscPrices.filter(
      (x) => x instanceof DuraformMiscPriceLooseFoilDto
    ) as DuraformMiscPriceLooseFoilDto[];

    const unitPrice = looseFoilPrices.find(
      (x) => x.duraformWrapTypeId === duraformEnquiry.duraformWrapTypeId
    );

    return unitPrice ? unitPrice.price : 0;
  }

  toString(): string {
    return 'Loose Foil';
  }
}
