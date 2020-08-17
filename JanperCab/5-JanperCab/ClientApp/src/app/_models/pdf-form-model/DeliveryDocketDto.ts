import { HingeHoleTypeDto } from './../hinge-hole-type/HingeHoleTypeDto';
import { DuraformDrawerTypeForList } from './../duraform-drawer-type/DuraformDrawerTypeForList';
import { PantryDoorChairRailTypeForList } from './../pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformEdgeProfileForList } from './../duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { Type } from 'class-transformer';
import { DuraformOrderDto } from './../duraform-order/DuraformOrderDto';
import { DuraformQuoteDto } from './../duraform-order/DuraformQuoteDto';
import { DuraformDraftDto } from './../duraform-order/DuraformDraftDto';
import { DuraformFormDto } from '../duraform-order/DuraformFormDto';

export class DeliveryDocketDto {
  @Type(() => DuraformFormDto, {
    keepDiscriminatorProperty: false,
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {
          value: DuraformDraftDto,
          name: `${DuraformOrderTypeKey.Draft}`,
        },
        {
          value: DuraformQuoteDto,
          name: `${DuraformOrderTypeKey.Quote}`,
        },
        {
          value: DuraformOrderDto,
          name: `${DuraformOrderTypeKey.Order}`,
        },
      ],
    },
  })
  duraformForm: DuraformFormDto;

  duraformDesign: string;
  duraformSerie: string;
  duraformWrapType: string;
  duraformWrapColor: string;
  duraformEdgeProfile: string;
  hingeHoleType: string;
  duraformArch: string;

  edgeProfiles: DuraformEdgeProfileForList[];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[];
  duraformDrawerTypes: DuraformDrawerTypeForList[];
}
