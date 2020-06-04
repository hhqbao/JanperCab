import { DuraformDesignForOrderMenu } from '../duraform-design/DuraformDesignForOrderMenu';
import { DuraformWrapColorForSelection } from '../duraform-wrap-color/DuraformWrapColorForSelection';
import { DuraformWrapTypeForSelection } from '../duraform-wrap-type/DuraformWrapTypeForSelection';
import { DuraformSerieForList } from '../duraform-serie/DuraformSerieForList';

export class StepOneReturnValue {
  design: DuraformDesignForOrderMenu;
  serie: DuraformSerieForList;
  isRoutingOnly: boolean;
  wrapType: DuraformWrapTypeForSelection;
  wrapColor: DuraformWrapColorForSelection;
}
