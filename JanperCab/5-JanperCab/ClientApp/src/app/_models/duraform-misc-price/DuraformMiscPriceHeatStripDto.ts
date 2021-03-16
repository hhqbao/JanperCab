import { HeatStripSizeEnum } from './../../_enums/HeatStripSizeEnum';
import { DuraformMiscPriceDto } from './DuraformMiscPriceDto';

export class DuraformMiscPriceHeatStripDto extends DuraformMiscPriceDto {
  heatStripSize: HeatStripSizeEnum;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceHeatStripDto, 3-Application';
  }
}
