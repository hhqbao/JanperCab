import { DuraformOptionPaneFrame } from './DuraformOptionPaneFrame';
import { DuraformOptionFoldBack } from './DuraformOptionFoldBack';
import { DuraformOptionNoFace } from './DuraformOptionNoFace';
import { DuraformOptionTypeKey } from './../../_enums/DuraformOptionTypeKey';
import { DuraformOption } from './DuraformOption';
import { DuraformOptionDoubleSided } from './DuraformOptionDoubleSided';

export class DuraformOptionType {
  id: DuraformOptionTypeKey;
  name: string;
  type: string;

  static GetDuraformOptionInstance(
    optionType: DuraformOptionType,
    optionValues: any
  ): DuraformOption {
    switch (optionType.id) {
      case DuraformOptionTypeKey.NoFaceRoute:
        return new DuraformOptionNoFace(optionType, optionValues);
      case DuraformOptionTypeKey.DoubleSided:
        return new DuraformOptionDoubleSided(optionType, optionValues);
      case DuraformOptionTypeKey.FoldBack:
        return new DuraformOptionFoldBack(optionType, optionValues);
      case DuraformOptionTypeKey.PaneFrame:
        return new DuraformOptionPaneFrame(optionType, optionValues);
      default:
        return null;
    }
  }
}
