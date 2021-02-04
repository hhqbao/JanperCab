import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformOptionAngledShelfDto } from './../duraform-option/DuraformOptionAngledShelfDto';
import { DuraformOptionMicrowaveFrameDto } from './../duraform-option/DuraformOptionMicrowaveFrameDto';
import { DuraformOptionRollerShutterFrameDto } from './../duraform-option/DuraformOptionRollerShutterFrameDto';
import { DuraformOptionPaneFrameDto } from './../duraform-option/DuraformOptionPaneFrameDto';
import { DuraformOptionFoldBackDto } from './../duraform-option/DuraformOptionFoldBackDto';
import { DuraformOptionDoubleSidedDto } from './../duraform-option/DuraformOptionDoubleSidedDto';
import { DuraformOptionNoFaceDto } from './../duraform-option/DuraformOptionNoFaceDto';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformComponentDto } from './DuraformComponentDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose, Type } from 'class-transformer';
import * as _ from 'lodash';

export abstract class DuraformComponentWithOptionDto extends DuraformComponentDto {
  @Type(() => DuraformOptionDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformOptionNoFaceDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionNoFaceDto, 3-Application',
        },
        {
          value: DuraformOptionDoubleSidedDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionDoubleSidedDto, 3-Application',
        },
        {
          value: DuraformOptionFoldBackDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionFoldBackDto, 3-Application',
        },
        {
          value: DuraformOptionPaneFrameDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionPaneFrameDto, 3-Application',
        },
        {
          value: DuraformOptionRollerShutterFrameDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionRollerShutterFrameDto, 3-Application',
        },
        {
          value: DuraformOptionMicrowaveFrameDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionMicrowaveFrameDto, 3-Application',
        },
        {
          value: DuraformOptionAngledShelfDto,
          name:
            '_3_Application.Dtos.DuraformOption.DuraformOptionAngledShelfDto, 3-Application',
        },
      ],
    },
  })
  duraformOption: DuraformOptionDto;

  get totalHeight(): number {
    return this.height;
  }

  get totalWidth(): number {
    if (!this.duraformOption) return this.width;

    return this.width + this.duraformOption.getExtraWidth();
  }

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.update(formValue);

    if (formValue.optionGroup) {
      const optionType = duraformOptionTypes.find(
        (x) => x.id === formValue.optionGroup.optionTypeId
      );

      if (!optionType) {
        throw new Error('Duraform Option Type Not Found');
      }

      const id = this.duraformOption?.id;
      this.duraformOption = DuraformOptionTypeDto.GetDuraformOptionInstance(
        optionType,
        formValue.optionGroup
      );
      this.duraformOption.id = id;
    } else {
      this.duraformOption = null;
    }
  }

  @Expose()
  getPriceForOne(serieId: number): number {
    let basePrice = DuraformAssetService.instance.getBasePrice(
      serieId,
      this.totalHeight,
      this.totalWidth
    );

    if (this.duraformOption) {
      basePrice += this.duraformOption.getExtraCharge(basePrice);
    }

    return _.round(basePrice, 2);
  }
}
