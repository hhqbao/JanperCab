import { DuraformDesignForOrderMenu } from '../duraform-design/DuraformDesignForOrderMenu';
import { DuraformWrapColorForSelection } from '../duraform-wrap-color/DuraformWrapColorForSelection';
import { DuraformWrapTypeForSelection } from '../duraform-wrap-type/DuraformWrapTypeForSelection';
import { DuraformSerieForList } from '../duraform-serie/DuraformSerieForList';
import { DuraformEdgeProfileForList } from '../duraform-edge-profile/DuraformEdgeProfileForList';

export class StepOneReturnValue {
  design: DuraformDesignForOrderMenu;
  edgeProfile: DuraformEdgeProfileForList;
  serie: DuraformSerieForList;
  isRoutingOnly: boolean;
  wrapType: DuraformWrapTypeForSelection;
  wrapColor: DuraformWrapColorForSelection;
}
