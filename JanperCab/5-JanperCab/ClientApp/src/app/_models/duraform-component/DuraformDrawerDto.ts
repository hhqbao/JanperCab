import { DuraformDrawerTypeDto } from './../duraform-drawer-type/DuraformDrawerTypeDto';
import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DrawerDesign } from 'src/app/_enums/DrawerDesign';
import { DuraformComponentDto } from './DuraformComponentDto';
import * as _ from 'lodash';
import { Expose } from 'class-transformer';

export class DuraformDrawerDto extends DuraformComponentDto {
  numberOfDrawers: 2 | 3 | 4 | 5;
  duraformDrawerTypeId: number;
  hasDrillFronts: boolean;
  drawerGap: number;
  drawerOne: number;
  drawerTwo: number;
  drawerThree: number;
  drawerFour: number;
  drawerFive: number;

  duraformDrawerType: DuraformDrawerTypeDto;

  get totalHeight(): number {
    const totalGap = (this.numberOfDrawers - 1) * this.drawerGap;

    return (
      totalGap +
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
    this.drawerGap = formValue.drawerGap;
    this.drawerOne = formValue.drawerOne ?? 0;
    this.drawerTwo = formValue.drawerTwo ?? 0;
    this.drawerThree = formValue.drawerThree ?? 0;
    this.drawerFour = formValue.drawerFour ?? 0;
    this.drawerFive = formValue.drawerFive ?? 0;

    this.duraformDrawerType = DuraformAssetService.instance.getDrawerType(
      this.duraformDrawerTypeId
    );
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    let basePrice = DuraformAssetService.instance.getBasePrice(
      duraformEnquiry.duraformSerieId,
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

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }
}
