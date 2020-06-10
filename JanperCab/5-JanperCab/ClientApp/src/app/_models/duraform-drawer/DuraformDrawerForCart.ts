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

  update(formValue: any, duraformDrawerTypes: DuraformDrawerTypeForList[]) {
    this.quantity = formValue.quantity;
    this.height = formValue.height;
    this.width = formValue.width;
    this.top = formValue.top;
    this.bottom = formValue.bottom;
    this.left = formValue.left;
    this.right = formValue.right;
    this.drawerOne = formValue.drawerOne;
    this.drawerTwo = formValue.drawerTwo;
    this.drawerThree = formValue.drawerThree;
    this.drawerFour = formValue.drawerFour;
    this.drawerFive = formValue.drawerFive;
    this.note = formValue.note;

    const drawerType = duraformDrawerTypes.find(
      (x) => x.id === +formValue.duraformDrawerTypeId
    );
    this.duraformDrawerType = drawerType;
  }
}
