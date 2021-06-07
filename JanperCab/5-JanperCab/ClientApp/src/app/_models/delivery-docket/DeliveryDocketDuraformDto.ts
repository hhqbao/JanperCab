import { DuraformArchDto } from './../duraform-arch/DuraformArchDto';
import { HingeHoleTypeDto } from './../hinge-hole-type/HingeHoleTypeDto';
import { DuraformEdgeProfileDto } from './../duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformWrapColorDto } from './../duraform-wrap-color/DuraformWrapColorDto';
import { DuraformWrapTypeDto } from './../duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformSerieDto } from './../duraform-serie/DuraformSerieDto';
import { DuraformDesignDto } from './../duraform-design/DuraformDesignDto';
import { Type } from 'class-transformer';
import { DuraformComponentDto } from '../duraform-component/DuraformComponentDto';
import { DuraformDoorDto } from '../duraform-component/DuraformDoorDto';
import { DuraformDrawerDto } from '../duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from '../duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from '../duraform-component/DuraformPantryDoorDto';
import { DuraformMiscCapMouldDto } from '../duraform-misc-component/DuraformMiscCapMouldDto';
import { DuraformMiscComponentDto } from '../duraform-misc-component/DuraformMiscComponentDto';
import { DuraformMiscFingerPullDto } from '../duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscHeatStripDto } from '../duraform-misc-component/DuraformMiscHeatStripDto';
import { DuraformMiscLooseFoilDto } from '../duraform-misc-component/DuraformMiscLooseFoilDto';
import { DeliveryDocketDto } from './DeliveryDocketDto';
import * as _ from 'lodash';

export class DeliveryDocketDuraformDto extends DeliveryDocketDto {
  duraformDesignId: number;
  duraformSerieId: number;
  isRoutingOnly: boolean;
  duraformWrapTypeId: number;
  duraformWrapColorId: number;
  duraformEdgeProfileId: number;
  hingeHoleTypeId: number;
  duraformArchId: number;

  @Type(() => DuraformDesignDto)
  duraformDesign: DuraformDesignDto;

  @Type(() => DuraformSerieDto)
  duraformSerie: DuraformSerieDto;

  @Type(() => DuraformWrapTypeDto)
  duraformWrapType: DuraformWrapTypeDto;

  @Type(() => DuraformWrapColorDto)
  duraformWrapColor: DuraformWrapColorDto;

  @Type(() => DuraformEdgeProfileDto)
  duraformEdgeProfile: DuraformEdgeProfileDto;

  @Type(() => HingeHoleTypeDto)
  hingeHoleType: HingeHoleTypeDto;

  @Type(() => DuraformArchDto)
  duraformArch: DuraformArchDto;

  @Type(() => DuraformComponentDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformDoorDto,
          name: '_3_Application.Dtos.DuraformComponent.DuraformDoorDto, 3-Application',
        },
        {
          value: DuraformPantryDoorDto,
          name: '_3_Application.Dtos.DuraformComponent.DuraformPantryDoorDto, 3-Application',
        },
        {
          value: DuraformEndPanelDto,
          name: '_3_Application.Dtos.DuraformComponent.DuraformEndPanelDto, 3-Application',
        },
        {
          value: DuraformDrawerDto,
          name: '_3_Application.Dtos.DuraformComponent.DuraformDrawerDto, 3-Application',
        },
      ],
    },
  })
  duraformComponents: DuraformComponentDto[] = [];

  @Type(() => DuraformMiscComponentDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformMiscLooseFoilDto,
          name: '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscLooseFoilDto, 3-Application',
        },
        {
          value: DuraformMiscCapMouldDto,
          name: '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscCapMouldDto, 3-Application',
        },
        {
          value: DuraformMiscFingerPullDto,
          name: '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscFingerPullDto, 3-Application',
        },
        {
          value: DuraformMiscHeatStripDto,
          name: '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscHeatStripDto, 3-Application',
        },
      ],
    },
  })
  miscComponents: DuraformMiscComponentDto[] = [];

  get duraformDoors(): DuraformDoorDto[] {
    const doors = this.duraformComponents.filter(
      (x) => x instanceof DuraformDoorDto
    );

    return _.orderBy(doors, ['sortNumber'], ['asc']) as DuraformDoorDto[];
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    const pantryDoors = this.duraformComponents.filter(
      (x) => x instanceof DuraformPantryDoorDto
    );

    return _.orderBy(
      pantryDoors,
      ['sortNumber'],
      ['asc']
    ) as DuraformPantryDoorDto[];
  }

  get endPanels(): DuraformEndPanelDto[] {
    const endPanels = this.duraformComponents.filter(
      (x) => x instanceof DuraformEndPanelDto
    );

    return _.orderBy(
      endPanels,
      ['sortNumber'],
      ['asc']
    ) as DuraformEndPanelDto[];
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    const drawers = this.duraformComponents.filter(
      (x) => x instanceof DuraformDrawerDto
    );

    return _.orderBy(drawers, ['sortNumber'], ['asc']) as DuraformDrawerDto[];
  }
}
