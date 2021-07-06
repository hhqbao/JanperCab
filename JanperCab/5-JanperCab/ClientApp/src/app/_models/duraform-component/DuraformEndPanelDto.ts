import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';
import { Expose } from 'class-transformer';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformEnquiryDto } from '../enquiry/DuraformEnquiryDto';
import * as _ from 'lodash';

export class DuraformEndPanelDto extends DuraformComponentWithOptionDto {
  numberOfShields: number;
  railLeft: number;
  railCenter: number;
  railRight: number;
  extraRailBottom: number;
  extraRailTop: number;

  get componentType(): DuraformComponentTypeEnum {
    return DuraformComponentTypeEnum.EndPanel;
  }

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    this.numberOfShields = formValue.numberOfShields;
    this.railLeft = formValue.railLeft;
    this.railCenter = formValue.railCenter;
    this.railRight = formValue.railRight;
    this.extraRailBottom = formValue.extraRailBottom;
    this.extraRailTop = formValue.extraRailTop;
  }

  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    const serieId =
      this.duraformOption && this.duraformOption.hasNoProfile
        ? 1
        : duraformEnquiry.duraformSerieId;

    let basePrice = 0;

    if (serieId === 1) {
      basePrice = DuraformAssetService.instance.getBasePrice(
        serieId,
        this.totalHeight,
        this.totalWidth
      );
    } else {
      const offsetWidth = _.round(this.totalWidth / this.numberOfShields, 0);

      const pricePerShield = DuraformAssetService.instance.getBasePrice(
        serieId,
        this.totalHeight,
        offsetWidth
      );

      basePrice = _.round(pricePerShield * this.numberOfShields, 2);
    }

    if (this.duraformOption) {
      basePrice = this.duraformOption.calculateUnitPrice(
        basePrice,
        duraformEnquiry,
        this
      );
    }

    return _.round(basePrice, 2);
  }
}
