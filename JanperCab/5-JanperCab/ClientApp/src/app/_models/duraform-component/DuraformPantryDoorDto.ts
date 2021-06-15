import { PantryDoorChairRailTypeDto } from './../pantry-door-chair-rail-type/PantryDoorChairRailTypeDto';
import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose } from 'class-transformer';
import * as _ from 'lodash';

export class DuraformPantryDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;

  chairRailType: PantryDoorChairRailTypeDto;

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    this.chairRailHeight = formValue.chairRailHeight;
    this.chairRailTypeId = formValue.chairRailTypeId;
    this.extraRailBottom = formValue.extraRailBottom;

    this.chairRailType = DuraformAssetService.instance.getChairRailType(
      this.chairRailTypeId
    );
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    let priceForOne = super.getUnitPrice(duraformEnquiry);

    if (this.hingeHoleOption) {
      const hingeStyle = DuraformAssetService.instance.getHingeStyle(
        this.hingeHoleOption.hingeHoleStyle
      );

      priceForOne += this.hingeHoleOption.quantity * hingeStyle.pantryPrice;
    }

    return _.round(priceForOne, 2);
  }

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }
}
