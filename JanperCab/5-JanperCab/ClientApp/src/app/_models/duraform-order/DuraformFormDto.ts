import { DuraformMiscDto } from './../duraform-misc/DuraformMiscDto';
import { DuraformFileDto } from './../application-file/DuraformFileDto';
import { DuraformDrawerDto } from './../duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from './../duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from './../duraform-component/DuraformPantryDoorDto';
import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { DuraformDoorDto } from './../duraform-component/DuraformDoorDto';
import { Type } from 'class-transformer';
import { DuraformComponentDto } from '../duraform-component/DuraformComponentDto';
import * as _ from 'lodash';

export abstract class DuraformFormDto {
  id: string;
  orderType: DuraformOrderTypeKey;
  customerOrderNumber: string;
  duraformDesignId: number;
  duraformSerieId: number;
  isRoutingOnly: boolean;
  duraformWrapTypeId: number;
  duraformWrapColorId: number;
  duraformEdgeProfileId: number;
  hingeHoleTypeId: number;
  duraformArchId: number;
  createdDate: Date;
  lastUpdated: Date;

  distributorId: number;
  cabinetMakerId: number;

  invoiceTo: string;
  invoiceAddress: string;
  invoiceSuburb: string;
  invoiceState: string;
  invoicePostcode: string;
  deliveryTo: string;
  deliveryAddress: string;
  deliverySuburb: string;
  deliveryState: string;
  deliveryPostcode: string;
  deliveryNote: string;

  notEditable: boolean;
  totalPrice: number;

  @Type(() => DuraformComponentDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformDoorDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformDoorDto, 3-Application',
        },
        {
          value: DuraformPantryDoorDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformPantryDoorDto, 3-Application',
        },
        {
          value: DuraformEndPanelDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformEndPanelDto, 3-Application',
        },
        {
          value: DuraformDrawerDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformDrawerDto, 3-Application',
        },
      ],
    },
  })
  duraformComponents: DuraformComponentDto[] = [];
  duraformMiscs: DuraformMiscDto[] = [];
  duraformFiles: DuraformFileDto[] = [];

  get discriminator(): string {
    return `${this.orderType}`;
  }

  get duraformDoors(): DuraformDoorDto[] {
    const doors = this.duraformComponents.filter(
      (x) => x instanceof DuraformDoorDto
    );

    return _.orderBy(doors as DuraformDoorDto[], ['sortNumber'], ['asc']);
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    const pantryDoors = this.duraformComponents.filter(
      (x) => x instanceof DuraformPantryDoorDto
    );

    return _.orderBy(
      pantryDoors as DuraformPantryDoorDto[],
      ['sortNumber'],
      ['asc']
    );
  }

  get endPanels(): DuraformEndPanelDto[] {
    const endPanels = this.duraformComponents.filter(
      (x) => x instanceof DuraformEndPanelDto
    );

    return _.orderBy(
      endPanels as DuraformEndPanelDto[],
      ['sortNumber'],
      ['asc']
    );
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    const drawers = this.duraformComponents.filter(
      (x) => x instanceof DuraformDrawerDto
    );

    return _.orderBy(drawers as DuraformDrawerDto[], ['sortNumber'], ['asc']);
  }

  constructor() {}
}
