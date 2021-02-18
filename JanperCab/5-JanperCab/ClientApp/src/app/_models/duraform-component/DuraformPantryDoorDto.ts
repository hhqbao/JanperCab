import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose } from 'class-transformer';
import * as _ from 'lodash';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';

export class DuraformPantryDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  chairRailHeight: number;
  chairRailTypeId: number;
  extraRailBottom: number;

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    this.chairRailHeight = formValue.chairRailHeight;
    this.chairRailTypeId = formValue.chairRailTypeId;
    this.extraRailBottom = formValue.extraRailBottom;
  }

  @Expose()
  getPriceForOne(serieId: number): number {
    let priceForOne = super.getPriceForOne(serieId);

    if (this.hingeHoleOption) {
      const hingeStyle = DuraformAssetService.instance.getHingeStyle(
        this.hingeHoleOption.hingeHoleStyle
      );

      priceForOne += this.hingeHoleOption.quantity * hingeStyle.pantryPrice;
    }

    return _.round(priceForOne, 2);
  }
}
