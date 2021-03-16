import { DuraformOptionAngledShelfDto } from './DuraformOptionAngledShelfDto';
import { DuraformOptionRollerShutterFrameDto } from './DuraformOptionRollerShutterFrameDto';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformOptionPaneFrameDto } from './DuraformOptionPaneFrameDto';
import { DuraformOptionFoldBackDto } from './DuraformOptionFoldBackDto';
import { DuraformOptionNoFaceDto } from './DuraformOptionNoFaceDto';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';
import { DuraformOptionDoubleSidedDto } from './DuraformOptionDoubleSidedDto';
import { DuraformOptionMicrowaveFrameDto } from './DuraformOptionMicrowaveFrameDto';

export class DuraformOptionTypeDto {
  id: DuraformOptionTypeKey;
  name: string;
  type: string;

  static GetDuraformOptionInstance(
    optionType: DuraformOptionTypeDto,
    optionValues: any
  ): DuraformOptionDto {
    let option;

    switch (optionType.id) {
      case DuraformOptionTypeKey.NoFaceRoute:
        option = new DuraformOptionNoFaceDto();
        option.$type = optionType.type;
        break;
      case DuraformOptionTypeKey.DoubleSided:
        option = new DuraformOptionDoubleSidedDto();
        option.$type = optionType.type;
        option.hasProfile = optionValues.hasProfile;
        break;
      case DuraformOptionTypeKey.FoldBack:
        option = new DuraformOptionFoldBackDto();
        option.$type = optionType.type;
        option.hasProfile = optionValues.hasProfile;
        option.thickness = optionValues.thickness;
        option.foldingType = optionValues.foldingType;
        option.leftLength = optionValues.leftLength;
        option.rightLength = optionValues.rightLength;
        break;
      case DuraformOptionTypeKey.PaneFrame:
        option = new DuraformOptionPaneFrameDto();
        option.$type = optionType.type;
        option.columns = optionValues.columns;
        option.rows = optionValues.rows;
        break;
      case DuraformOptionTypeKey.RollerShutter:
        option = new DuraformOptionRollerShutterFrameDto();
        option.$type = optionType.type;
        option.topSize = optionValues.topSize;
        option.leftSize = optionValues.leftSize;
        option.rightSize = optionValues.rightSize;
        break;
      case DuraformOptionTypeKey.MicrowaveFrame:
        option = new DuraformOptionMicrowaveFrameDto();
        option.$type = optionType.type;
        option.topSize = optionValues.topSize;
        option.bottomSize = optionValues.bottomSize;
        option.leftSize = optionValues.leftSize;
        option.rightSize = optionValues.rightSize;
        break;
      case DuraformOptionTypeKey.AngledShelf:
        option = new DuraformOptionAngledShelfDto();
        option.$type = optionType.type;
        option.sideOne = optionValues.sideOne;
        option.sideTwo = optionValues.sideTwo;
        option.isDoubleSided = optionValues.isDoubleSided;
        break;
      default:
        throw new Error('Unsupported Option Type');
    }

    option.duraformOptionTypeId = optionType.id;
    return option;
  }
}
