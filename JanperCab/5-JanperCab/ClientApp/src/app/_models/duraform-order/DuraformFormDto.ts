import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { DuraformDoorDto } from './../duraform-component/DuraformDoorDto';

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

  duraformDoors: DuraformDoorDto[];

  constructor() {}
}
