import { PantryDoorChairRailTypeForList } from '../pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';

export class PantryDoorForCart {
  quantity: number;
  height: number;
  width: number;
  chairRailHeight: number;
  chairRailType: PantryDoorChairRailTypeForList;
  extraRailBottom: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  note: string;

  constructor() {
    this.chairRailType = null;
  }
}
