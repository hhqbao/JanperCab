import { DuraformArchDto } from './../duraform-arch/DuraformArchDto';
import { DuraformWrapColorDto } from './../duraform-wrap-color/DuraformWrapColorDto';
import { DuraformWrapTypeDto } from './../duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformSerieDto } from './../duraform-serie/DuraformSerieDto';
import { DuraformDesignDto } from './../duraform-design/DuraformDesignDto';
import { DuraformEdgeProfileDto } from './../duraform-edge-profile/DuraformEdgeProfileDto';

export class StepOneReturnValue {
  design: DuraformDesignDto;
  edgeProfile: DuraformEdgeProfileDto;
  serie: DuraformSerieDto;
  arch: DuraformArchDto;
  isRoutingOnly: boolean;
  wrapType: DuraformWrapTypeDto;
  wrapColor: DuraformWrapColorDto;
}
