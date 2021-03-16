import { DuraformMiscPriceHeatStripDto } from './../duraform-misc-price/DuraformMiscPriceHeatStripDto';
import { DuraformMiscPriceFingerPullDto } from './../duraform-misc-price/DuraformMiscPriceFingerPullDto';
import { DuraformMiscPriceLooseFoilDto } from './../duraform-misc-price/DuraformMiscPriceLooseFoilDto';
import { Type } from 'class-transformer';
import { DuraformMiscPriceDto } from '../duraform-misc-price/DuraformMiscPriceDto';
import { DuraformMiscPriceCapMouldDto } from '../duraform-misc-price/DuraformMiscPriceCapMouldDto';

export class DuraformMiscPriceModel {
  @Type(() => DuraformMiscPriceDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformMiscPriceLooseFoilDto,
          name:
            '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceLooseFoilDto, 3-Application',
        },
        {
          value: DuraformMiscPriceCapMouldDto,
          name:
            '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceCapMouldDto, 3-Application',
        },
        {
          value: DuraformMiscPriceFingerPullDto,
          name:
            '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceFingerPullDto, 3-Application',
        },
        {
          value: DuraformMiscPriceHeatStripDto,
          name:
            '_3_Application.Dtos.DuraformMiscPrice.DuraformMiscPriceHeatStripDto, 3-Application',
        },
      ],
    },
  })
  prices: DuraformMiscPriceDto[] = [];
}
