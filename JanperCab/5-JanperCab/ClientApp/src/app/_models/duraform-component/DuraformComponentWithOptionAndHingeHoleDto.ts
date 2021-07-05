import { HingeHoleOptionCornerBlankDto } from './../hinge-hole-option/HingeHoleOptioCornerBlankDto';
import { HingeHoleOptionCornerDoorDto } from './../hinge-hole-option/HingeHoleOptionCornerDoorDto';
import { HingeHoleOptionSideDto } from 'src/app/_models/hinge-hole-option/HingeHoleOptionSideDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { HingeHoleOptionDrawDto } from './../hinge-hole-option/HingeHoleOptionDrawDto';
import { HingeHoleOptionDto } from './../hinge-hole-option/HingeHoleOptionDto';
import { DuraformComponentWithOptionDto } from './DuraformComponentWithOptionDto';
import { DuraformOptionTypeDto } from '../duraform-option/DuraformOptionTypeDto';
import { Expose, Type } from 'class-transformer';
import * as _ from 'lodash';
import { HingeHoleStyleEnum } from 'src/app/_enums/HingeHoleStyleEnum';

export abstract class DuraformComponentWithOptionAndHingeHoleDto extends DuraformComponentWithOptionDto {
  @Type(() => HingeHoleOptionDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: HingeHoleOptionSideDto,
          name: '_3_Application.Dtos.HingeHoleOption.HingeHoleOptionSideDto, 3-Application',
        },
        {
          value: HingeHoleOptionDrawDto,
          name: '_3_Application.Dtos.HingeHoleOption.HingeHoleOptionDrawDto, 3-Application',
        },
        {
          value: HingeHoleOptionCornerDoorDto,
          name: '_3_Application.Dtos.HingeHoleOption.HingeHoleOptionCornerDoorDto, 3-Application',
        },
        {
          value: HingeHoleOptionCornerBlankDto,
          name: '_3_Application.Dtos.HingeHoleOption.HingeHoleOptionCornerBlankDto, 3-Application',
        },
      ],
    },
  })
  hingeHoleOption: HingeHoleOptionDto;

  @Expose()
  updateWithOption(
    formValue: any,
    duraformOptionTypes: DuraformOptionTypeDto[]
  ) {
    super.updateWithOption(formValue, duraformOptionTypes);

    const { hingeHole } = formValue;

    if (hingeHole) {
      const id = this.hingeHoleOption?.id;
      const style = DuraformAssetService.instance.getHingeStyle(
        hingeHole.hingeHoleStyle
      );

      switch (style.id) {
        case HingeHoleStyleEnum.Side:
          this.hingeHoleOption = new HingeHoleOptionSideDto();
          break;
        case HingeHoleStyleEnum.Draw:
          this.hingeHoleOption = new HingeHoleOptionDrawDto();
          break;
        case HingeHoleStyleEnum.CornerDoor:
          this.hingeHoleOption = new HingeHoleOptionCornerDoorDto();
          break;
        case HingeHoleStyleEnum.CornerBlank:
          this.hingeHoleOption = new HingeHoleOptionCornerBlankDto();
          break;
        default:
          throw new Error('Hinge Hole Style Not Supported');
      }

      this.hingeHoleOption.$type = style.classType;
      this.hingeHoleOption.id = id;
      this.hingeHoleOption.update(hingeHole);
    } else {
      this.hingeHoleOption = null;
    }
  }
}
