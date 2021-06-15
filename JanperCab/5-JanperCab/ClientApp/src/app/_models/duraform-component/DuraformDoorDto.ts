import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { Expose } from 'class-transformer';
import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import * as _ from 'lodash';

export class DuraformDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  @Expose()
  getUnitPrice(duraformEnquiry: DuraformEnquiryDto): number {
    let priceForOne = super.getUnitPrice(duraformEnquiry);

    if (this.hingeHoleOption) {
      const hingeStyle = DuraformAssetService.instance.getHingeStyle(
        this.hingeHoleOption.hingeHoleStyle
      );

      priceForOne += this.hingeHoleOption.quantity * hingeStyle.doorPrice;
    }

    return _.round(priceForOne, 2);
  }

  @Expose()
  calculateUnitPrice(duraformEnquiry: DuraformEnquiryDto): void {
    this.unitPrice = this.getUnitPrice(duraformEnquiry);
  }
}
