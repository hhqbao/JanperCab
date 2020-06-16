import { DuraformDrawerForCart } from './../_models/duraform-drawer/DuraformDrawerForCart';
import { EndPanelForCart } from './../_models/end-panel/EndPanelForCart';
import { PantryDoorForCart } from './../_models/pantry-door/PantryDoorForCart';
import { DuraformDoorForCart } from './../_models/duraform-door/DuraformDoorForCart';
import { DuraformArchForList } from './../_models/duraform-arch/DuraformArchForList';
import { SelectedArch } from './../_models/duraform-arch/SelectedArch';
import { DuraformEdgeProfileForList } from './../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { SelectedDuraformEdgeProfile } from './../_models/duraform-edge-profile/SelectedDuraformEdgeProfile';
import { StepOneReturnValue } from '../_models/duraform-order/StepOneReturnValue';
import { SelectedDuraformWrapColor } from './../_models/duraform-wrap-color/SelectedDuraformWrapColor';
import { SelectedDuraformWrapType } from './../_models/duraform-wrap-type/SelectedDuraformWrapType';
import { SelectedDuraformSerie } from './../_models/duraform-serie/SelectedDuraformSerie';
import { SelectedDuraformDesign } from './../_models/duraform-design/SelectedDuraformDesign';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DuraformOrderService {
  selectedDesign: SelectedDuraformDesign;
  selectedSerie: SelectedDuraformSerie;
  isRoutingOnly: boolean;
  selectedWrapType: SelectedDuraformWrapType;
  selectedWrapColor: SelectedDuraformWrapColor;
  selectedEdgeProfile: SelectedDuraformEdgeProfile;
  selectedArch: SelectedArch;

  doors: DuraformDoorForCart[] = [];
  pantryDoors: PantryDoorForCart[] = [];
  endPanels: EndPanelForCart[] = [];
  duraformDrawers: DuraformDrawerForCart[] = [];

  get hasFixedEdgeProfile(): boolean {
    return !!this.selectedDesign.fixedEdgeProfileId;
  }

  get hasComponent(): boolean {
    return (
      this.doors.length > 0 ||
      this.pantryDoors.length > 0 ||
      this.endPanels.length > 0 ||
      this.duraformDrawers.length > 0
    );
  }

  constructor() {}

  submitStepOne = (model: StepOneReturnValue) => {
    this.selectedDesign = { ...model.design };
    this.selectedSerie = { ...model.serie };
    this.isRoutingOnly = model.isRoutingOnly;
    this.selectedWrapType = model.wrapType ? { ...model.wrapType } : null;
    this.selectedWrapColor = model.wrapColor ? { ...model.wrapColor } : null;
    this.selectedArch = model.design.hasNoArch ? null : this.selectedArch;
  };

  selectEdgeProfile = (model: DuraformEdgeProfileForList) => {
    this.selectedEdgeProfile = { ...model };
  };

  selectArch = (model: DuraformArchForList) => {
    this.selectedArch = model ? { ...model } : null;
  };

  removeDoor = (door: DuraformDoorForCart) => {
    const index = this.doors.indexOf(door);

    if (index >= 0) {
      this.doors.splice(index, 1);
    }
  };

  removePantryDoor = (pantryDoor: PantryDoorForCart) => {
    const index = this.pantryDoors.indexOf(pantryDoor);

    if (index >= 0) {
      this.pantryDoors.splice(index, 1);
    }
  };

  removeEndPanel = (endPanel: EndPanelForCart) => {
    const index = this.endPanels.indexOf(endPanel);

    if (index >= 0) {
      this.endPanels.splice(index, 1);
    }
  };

  removeDuraformDrawer = (drawer: DuraformDrawerForCart) => {
    const index = this.duraformDrawers.indexOf(drawer);

    if (index >= 0) {
      this.duraformDrawers.splice(index, 1);
    }
  };

  reset = () => {
    this.selectedDesign = null;
    this.selectedSerie = null;
    this.isRoutingOnly = null;
    this.selectedWrapType = null;
    this.selectedWrapColor = null;
    this.selectedEdgeProfile = null;
    this.selectedArch = null;

    this.doors = [];
    this.pantryDoors = [];
    this.endPanels = [];
    this.duraformDrawers = [];
  };
}
