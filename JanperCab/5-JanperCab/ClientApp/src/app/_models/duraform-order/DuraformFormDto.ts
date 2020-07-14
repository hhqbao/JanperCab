import { DuraformDrawerDto } from './../duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from './../duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from './../duraform-component/DuraformPantryDoorDto';
import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { DuraformDoorDto } from './../duraform-component/DuraformDoorDto';
import { Type } from 'class-transformer';

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

  @Type(() => DuraformDoorDto)
  duraformDoors: DuraformDoorDto[] = [];

  pantryDoors: DuraformPantryDoorDto[] = [];

  endPanels: DuraformEndPanelDto[] = [];

  duraformDrawers: DuraformDrawerDto[] = [];

  constructor() {}
}
