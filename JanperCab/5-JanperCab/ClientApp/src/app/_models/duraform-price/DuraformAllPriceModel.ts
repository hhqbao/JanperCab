import { Type } from 'class-transformer';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { DuraformRouteOnlyPriceGridDto } from './DuraformRouteOnlyPriceGridDto';
import { DuraformWrapPriceGridDto } from './DuraformWrapPriceGridDto';

export class DuraformAllPriceModel {
  @Type(() => DuraformPriceGridDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformWrapPriceGridDto,
          name:
            '_3_Application.Dtos.DuraformPriceGrid.DuraformWrapPriceGridDto, 3-Application',
        },
        {
          value: DuraformRouteOnlyPriceGridDto,
          name:
            '_3_Application.Dtos.DuraformPriceGrid.DuraformRouteOnlyPriceGridDto, 3-Application',
        },
      ],
    },
  })
  prices: DuraformPriceGridDto[] = [];
}
