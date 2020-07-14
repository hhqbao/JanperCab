import { DuraformComponentDto } from './DuraformComponentDto';

export class DuraformDrawerDto extends DuraformComponentDto {
  duraformDrawerTypeId: number;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;

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
