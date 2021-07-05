import { PantryDoorChairRailTypeDto } from './../pantry-door-chair-rail-type/PantryDoorChairRailTypeDto';
import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose } from 'class-transformer';
import * as _ from 'lodash';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';

export class DuraformPantryDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;

  chairRailType: PantryDoorChairRailTypeDto;

  get componentType(): DuraformComponentTypeEnum {
    return DuraformComponentTypeEnum.PantryDoor;
  }

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
      priceForOne += this.hingeHoleOption.getPrice(this);
    }

    return _.round(priceForOne, 2);
  }

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }
}
