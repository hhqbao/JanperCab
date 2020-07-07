import { DuraformOptionPaneFrameDto } from './DuraformOptionPaneFrameDto';
import { DuraformOptionFoldBackDto } from './DuraformOptionFoldBackDto';
import { DuraformOptionNoFaceDto } from './DuraformOptionNoFaceDto';
import { DuraformOptionTypeKey } from '../../_enums/DuraformOptionTypeKey';
import { DuraformOptionDto } from './DuraformOptionDto';
import { DuraformOptionDoubleSidedDto } from './DuraformOptionDoubleSidedDto';

export class DuraformOptionTypeDto {
  id: DuraformOptionTypeKey;
  name: string;
  type: string;

  static GetDuraformOptionInstance(
    optionType: DuraformOptionTypeDto,
    optionValues: any
  ): DuraformOptionDto {
    switch (optionType.id) {
      case DuraformOptionTypeKey.NoFaceRoute:
        return new DuraformOptionNoFaceDto(optionType, optionValues);
      case DuraformOptionTypeKey.DoubleSided:
        return new DuraformOptionDoubleSidedDto(optionType, optionValues);
      case DuraformOptionTypeKey.FoldBack:
        return new DuraformOptionFoldBackDto(optionType, optionValues);
      case DuraformOptionTypeKey.PaneFrame:
        return new DuraformOptionPaneFrameDto(optionType, optionValues);
      default:
        return null;
    }
  }
}
