import { DistributorDto } from './../customer/DistributorDto';
import { DuraformOrderDto } from './../duraform-order/DuraformOrderDto';
import { DuraformEdgeProfileForList } from '../duraform-edge-profile/DuraformEdgeProfileForList';
import { PantryDoorChairRailTypeForList } from '../pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformDrawerTypeForList } from '../duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformComponentDto } from '../duraform-component/DuraformComponentDto';
export class CabProDuraformDto {
  duraformOrder: DuraformOrderDto;

  distributor: DistributorDto;
  duraformDesign: string;
  duraformSerie: string;
  duraformWrapType: string;
  duraformWrapColor: string;
  duraformEdgeProfile: string;
  hingeHoleType: string;
  duraformArch: string;

  edgeProfiles: DuraformEdgeProfileForList[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  duraformDrawerTypes: DuraformDrawerTypeForList[] = [];

  getNote(
    component:
      | DuraformComponentDto
      | DuraformComponentWithOptionDto
      | DuraformComponentWithOptionAndHingeHoleDto
  ): string {
    let note = '';
    if (component instanceof DuraformComponentWithOptionAndHingeHoleDto) {
      const withOptionHingHole = component as DuraformComponentWithOptionAndHingeHoleDto;
      note += withOptionHingHole.duraformOption
        ? `${withOptionHingHole.duraformOption.toString()}`
        : '';
      note += withOptionHingHole.hingeHoleOption
        ? `, ${withOptionHingHole.hingeHoleOption.toString()}`
        : '';
    } else {
      if (component instanceof DuraformComponentWithOptionDto) {
        const withOption = component as DuraformComponentWithOptionDto;
        note += withOption.duraformOption
          ? `${withOption.duraformOption.toString()}`
          : '';
      }
    }

    note += component.note.length > 0 ? `, ${component.note}` : '';

    return note;
  }

  getEdgeProfile(id: number) {
    return this.edgeProfiles.find((x) => x.id === id);
  }

  getChairRailType(id: number) {
    return this.pantryDoorChairRailTypes.find((x) => x.id === id);
  }

  getDrawerType(id: number) {
    return this.duraformDrawerTypes.find((x) => x.id === id);
  }
}
