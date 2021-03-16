import { DuraformMiscPriceDto } from './DuraformMiscPriceDto';

export class DuraformMiscPriceLooseFoilDto extends DuraformMiscPriceDto {
  duraformWrapTypeId: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceLooseFoilDto, 3-Application';
  }
}
