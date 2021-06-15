import { DuraformMiscPriceHeatStripDto } from './../duraform-misc-price/DuraformMiscPriceHeatStripDto';
import { FormGroup } from '@angular/forms';
import { DuraformMiscTypeEnum } from 'src/app/_enums/DuraformMiscTypeEnum';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import { HeatStripSizeEnum } from './../../_enums/HeatStripSizeEnum';
import { HeatStripTypeEnum } from './../../_enums/HeatStripTypeEnum';
import { DuraformMiscComponentDto } from './DuraformMiscComponentDto';
import { Expose } from 'class-transformer';

export class DuraformMiscHeatStripDto extends DuraformMiscComponentDto {
  type: HeatStripTypeEnum;
  size: HeatStripSizeEnum;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscHeatStripDto, 3-Application';
    this.type = HeatStripTypeEnum.Angle;
    this.size = HeatStripSizeEnum.SizeA;
  }

  get miscType(): DuraformMiscTypeEnum {
    return DuraformMiscTypeEnum.HeatStrip;
  }

  @Expose()
  update(formGroup: FormGroup) {
    const values = formGroup.value;
    this.quantity = values.quantity;
    this.type = values.type;
    this.size = values.size;
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const heatStripPrices = DuraformAssetService.instance.miscPrices.filter(
      (x) => x instanceof DuraformMiscPriceHeatStripDto
    ) as DuraformMiscPriceHeatStripDto[];

    const unitPrice = heatStripPrices.find(
      (x) => x.heatStripSize === this.size
    );

    return unitPrice ? unitPrice.price : 0;
  }

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }

  @Expose()
  toString(): string {
    return `Heat Strip - Type ${HeatStripTypeEnum[this.type]} - ${this.size}mm`;
  }
}
