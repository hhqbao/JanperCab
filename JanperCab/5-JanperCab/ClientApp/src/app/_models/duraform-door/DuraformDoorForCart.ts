import { DuraformDoorOptionForList } from '../duraform-door-option/DuraformDoorOptionForList';

export class DuraformDoorForCart {
  quantity: number;
  height: number;
  width: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  duraformDoorOption: DuraformDoorOptionForList;
  note: string;

  constructor() {
    this.duraformDoorOption = null;
  }
}
