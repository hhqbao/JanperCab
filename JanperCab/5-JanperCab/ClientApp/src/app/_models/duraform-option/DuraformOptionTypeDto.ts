import { DuraformOptionRollerShutterFrameDto } from './DuraformOptionRollerShutterFrameDto';
import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';
import { DuraformOptionDto } from 'src/app/_models/duraform-option/DuraformOptionDto';
import { DuraformOptionPaneFrameDto } from './DuraformOptionPaneFrameDto';
import { DuraformOptionFoldBackDto } from './DuraformOptionFoldBackDto';
import { DuraformOptionNoFaceDto } from './DuraformOptionNoFaceDto';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';
import { DuraformOptionDoubleSidedDto } from './DuraformOptionDoubleSidedDto';

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
        throw new Error('Unsupported Option Type');
      default:
        throw new Error('Unsupported Option Type');
    }

    option.duraformOptionTypeId = optionType.id;
    return option;
  }
}
