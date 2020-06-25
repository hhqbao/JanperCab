import { DuraformDrawerTypeForList } from './../duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformComponentForCart } from '../duraform-component-for-cart/DuraformComponentForCart';
export class DuraformDrawerForCart extends DuraformComponentForCart {
  duraformDrawerTypeId: number;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;

  constructor() {
    super();
  }

  update(formValue: any) {
    super.update(formValue);
    this.duraformDrawerTypeId = formValue.duraformDrawerTypeId;
    this.drawerOne = formValue.drawerOne;
    this.drawerTwo = formValue.drawerTwo;
    this.drawerThree = formValue.drawerThree;
    this.drawerFour = formValue.drawerFour;
    this.drawerFive = formValue.drawerFive;
  }
}
