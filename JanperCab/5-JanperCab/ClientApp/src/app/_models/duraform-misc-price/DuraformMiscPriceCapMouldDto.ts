import { DuraformMiscPriceDto } from './DuraformMiscPriceDto';

export class DuraformMiscPriceCapMouldDto extends DuraformMiscPriceDto {
  duraformWrapTypeId: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceCapMouldDto, 3-Application';
  }
}
