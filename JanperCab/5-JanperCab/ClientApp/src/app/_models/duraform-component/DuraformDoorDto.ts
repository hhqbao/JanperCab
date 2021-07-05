import { DuraformEnquiryDto } from './../enquiry/DuraformEnquiryDto';
import { Expose } from 'class-transformer';
import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import * as _ from 'lodash';
import { DuraformComponentTypeEnum } from 'src/app/_enums/DuraformComponentTypeEnum';

export class DuraformDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  @Expose()
  get componentType(): DuraformComponentTypeEnum {
    return DuraformComponentTypeEnum.Door;
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
