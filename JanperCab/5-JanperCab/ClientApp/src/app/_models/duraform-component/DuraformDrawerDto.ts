import { DuraformDrawerTypeForList } from './../duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DrawerDesign } from 'src/app/_enums/DrawerDesign';
import { DuraformComponentDto } from './DuraformComponentDto';
import * as _ from 'lodash';
import { Expose } from 'class-transformer';

export class DuraformDrawerDto extends DuraformComponentDto {
  numberOfDrawers: 2 | 3 | 4 | 5;
  duraformDrawerTypeId: number;
  hasDrillFronts: boolean;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;

  get duraformDrawerType(): DuraformDrawerTypeForList {
    return DuraformAssetService.instance.getDrawerType(
      this.duraformDrawerTypeId
    );
  }

  get totalHeight(): number {
    return (
      this.drawerOne +
      this.drawerTwo +
      this.drawerThree +
      this.drawerFour +
      this.drawerFive
    );
  }

  get totalWidth(): number {
    return this.width;
  }

  @Expose()
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

  @Expose()
  getPriceForOne(serieId: number): number {
    let basePrice = DuraformAssetService.instance.getBasePrice(
      serieId,
      this.totalHeight,
      this.totalWidth
    );

    switch (this.duraformDrawerType.drawerDesign) {
      case DrawerDesign.Single:
        basePrice += (basePrice * 50) / 100;
        break;
      case DrawerDesign.Individual:
        basePrice += (basePrice * 70) / 100;
        break;
    }

    return _.round(basePrice, 2);
  }
}
