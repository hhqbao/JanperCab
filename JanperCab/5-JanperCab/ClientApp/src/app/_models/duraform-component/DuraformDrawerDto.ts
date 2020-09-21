import { DuraformComponentDto } from './DuraformComponentDto';

export class DuraformDrawerDto extends DuraformComponentDto {
  numberOfDrawers: 2 | 3 | 4 | 5;
  duraformDrawerTypeId: number;
  hasDrillFronts: boolean;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;

  update(formValue: any) {
    super.update(formValue);

    this.numberOfDrawers = formValue.numberOfDrawers;
    this.duraformDrawerTypeId = formValue.duraformDrawerTypeId;
    this.hasDrillFronts = formValue.hasDrillFronts;
    this.drawerOne = formValue.drawerOne;
    this.drawerTwo = formValue.drawerTwo;
    this.drawerThree = formValue.drawerThree;
    this.drawerFour = formValue.drawerFour;
    this.drawerFive = formValue.drawerFive;
  }
}
