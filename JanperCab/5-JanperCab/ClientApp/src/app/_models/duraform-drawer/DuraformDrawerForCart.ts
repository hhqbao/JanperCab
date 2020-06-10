import { DuraformDrawerTypeForList } from './../duraform-drawer-type/DuraformDrawerTypeForList';
export class DuraformDrawerForCart {
  quantity: number;
  height: number;
  width: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;
  note: string;

  duraformDrawerType: DuraformDrawerTypeForList;

  constructor() {
    this.duraformDrawerType = null;
  }
}
