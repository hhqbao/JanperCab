import { SelectedDuraformDesign } from '../duraform-design/SelectedDuraformDesign';
import { SelectedDuraformSerie } from '../duraform-serie/SelectedDuraformSerie';
import { SelectedDuraformWrapType } from '../duraform-wrap-type/SelectedDuraformWrapType';
import { SelectedDuraformWrapColor } from '../duraform-wrap-color/SelectedDuraformWrapColor';
import { SelectedDuraformEdgeProfile } from '../duraform-edge-profile/SelectedDuraformEdgeProfile';
import { SelectedArch } from '../duraform-arch/SelectedArch';
import { DuraformDoorForCart } from '../duraform-door/DuraformDoorForCart';
import { PantryDoorForCart } from '../pantry-door/PantryDoorForCart';
import { EndPanelForCart } from '../end-panel/EndPanelForCart';
import { DuraformDrawerForCart } from '../duraform-drawer/DuraformDrawerForCart';

export class DuraformFormData {
  customerOrderNumber: string;
  selectedDesign: SelectedDuraformDesign;
  selectedSerie: SelectedDuraformSerie;
  isRoutingOnly: boolean;
  selectedWrapType: SelectedDuraformWrapType;
  selectedWrapColor: SelectedDuraformWrapColor;
  selectedEdgeProfile: SelectedDuraformEdgeProfile;
  private selectedHingeHoleTypeId: number;
  selectedArch: SelectedArch;

  doors: DuraformDoorForCart[] = [];
  pantryDoors: PantryDoorForCart[] = [];
  endPanels: EndPanelForCart[] = [];
  duraformDrawers: DuraformDrawerForCart[] = [];

  get hasFixedEdgeProfile(): boolean {
    return !!this.selectedDesign.fixedEdgeProfileId;
  }

  get canTickEdgeProfile(): boolean {
    const { forcedValuePerItem } = this.selectedEdgeProfile;

    if (
      this.hasFixedEdgeProfile &&
      [true, false].includes(forcedValuePerItem)
    ) {
      return false;
    }

    return true;
  }

  get hingeHoleTypeId(): number {
    return this.selectedHingeHoleTypeId;
  }

  set hingeHoleTypeId(typeId: number) {
    this.selectedHingeHoleTypeId = typeId;

    if (!this.hingeHoleTypeId) {
      this.doors = this.doors.map((x) => {
        x.hingeHoleOption = null;
        return x;
      });
      this.pantryDoors = this.pantryDoors.map((x) => {
        x.hingeHoleOption = null;
        return x;
      });
    }
  }

  get hasComponent(): boolean {
    const { doors, pantryDoors, endPanels, duraformDrawers } = this;

    return (
      doors.length > 0 ||
      pantryDoors.length > 0 ||
      endPanels.length > 0 ||
      duraformDrawers.length > 0
    );
  }

  get componentsWithHingeHoleCount(): number {
    if (!this.hingeHoleTypeId) {
      return 0;
    }

    const doors = this.doors.filter((x) => x.hingeHoleOption);
    const pantryDoors = this.pantryDoors.filter((x) => x.hingeHoleOption);
    let count = 0;
    doors.forEach((x) => {
      count += x.quantity;
    });
    pantryDoors.forEach((x) => {
      count += x.quantity;
    });

    return count;
  }

  get description(): string {
    const designName = this.selectedDesign?.name;
    const finish = this.isRoutingOnly
      ? 'ROUTE ONLY'
      : `${this.selectedWrapType?.name} ${this.selectedWrapColor?.name}`;

    return `${designName} - ${finish} - ${this.selectedSerie?.name}`;
  }
}
