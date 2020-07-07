import { DuraformComponentWithOptionAndHingeHoleDto } from './DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformDoorForCart } from '../duraform-door/DuraformDoorForCart';

export class DuraformDoorDto extends DuraformComponentWithOptionAndHingeHoleDto {
  static FromCartItem(door: DuraformDoorForCart): DuraformDoorDto {
    const doorDto = new DuraformDoorDto();
    doorDto.quantity = door.quantity;
    doorDto.height = door.height;
    doorDto.width = door.width;
    doorDto.duraformEdgeProfileId = door.duraformEdgeProfileId;
    doorDto.top = door.top;
    doorDto.bottom = door.bottom;
    doorDto.left = door.left;
    doorDto.right = door.right;
    doorDto.note = door.note;
    doorDto.hingeHoleOption = door.hingeHoleOption;
    doorDto.duraformOption = door.duraformOption;

    return doorDto;
  }
}
