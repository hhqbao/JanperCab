import { DuraformMiscPriceDto } from './DuraformMiscPriceDto';

export class DuraformMiscPriceFingerPullDto extends DuraformMiscPriceDto {
  duraformWrapTypeId: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceFingerPullDto, 3-Application';
  }
}
