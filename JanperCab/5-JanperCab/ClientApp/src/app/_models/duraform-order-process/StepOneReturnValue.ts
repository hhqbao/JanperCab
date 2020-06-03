import { DuraformWrapColorForSelection } from './../duraform-wrap-color/DuraformWrapColorForSelection';
import { DuraformWrapTypeForSelection } from './../duraform-wrap-type/DuraformWrapTypeForSelection';
import { DuraformSerieForList } from './../duraform-serie/DuraformSerieForList';
import { DuraformDoorForOrderMenu } from './../duraform-door/DuraformDoorForOrderMenu';

export class StepOneReturnValue {
  door: DuraformDoorForOrderMenu;
  serie: DuraformSerieForList;
  isRoutingOnly: boolean;
  wrapType: DuraformWrapTypeForSelection;
  wrapColor: DuraformWrapColorForSelection;
}
