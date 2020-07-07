import { DuraformDraftDto } from './../_models/duraform-order/DuraformDraftDto';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DuraformDrawerForCart } from './../_models/duraform-drawer/DuraformDrawerForCart';
import { EndPanelForCart } from './../_models/end-panel/EndPanelForCart';
import { PantryDoorForCart } from './../_models/pantry-door/PantryDoorForCart';
import { DuraformDoorForCart } from './../_models/duraform-door/DuraformDoorForCart';
import { DuraformArchForList } from './../_models/duraform-arch/DuraformArchForList';
import { DuraformEdgeProfileForList } from './../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { StepOneReturnValue } from '../_models/duraform-order/StepOneReturnValue';
import { Injectable } from '@angular/core';
import { DuraformFormData } from '../_models/duraform-order/DuraformFormData';

@Injectable({ providedIn: 'root' })
export class DuraformOrderService {
  draftId: string;

  formData: DuraformFormData;

  constructor(private http: HttpClient) {
    this.draftId = null;
    this.formData = new DuraformFormData();
  }

  submitStepOne = (model: StepOneReturnValue) => {
    this.formData.selectedDesign = { ...model.design };
    this.formData.selectedEdgeProfile = { ...model.edgeProfile };
    this.formData.selectedSerie = { ...model.serie };
    this.formData.isRoutingOnly = model.isRoutingOnly;
    this.formData.selectedWrapType = model.wrapType
      ? { ...model.wrapType }
      : null;
    this.formData.selectedWrapColor = model.wrapColor
      ? { ...model.wrapColor }
      : null;
    this.formData.selectedArch = model.design.hasNoArch
      ? null
      : this.formData.selectedArch;
  };

  selectEdgeProfile = (model: DuraformEdgeProfileForList) => {
    this.formData.selectedEdgeProfile = { ...model };
  };

  selectArch = (model: DuraformArchForList) => {
    this.formData.selectedArch = model ? { ...model } : null;
  };

  removeDoor = (door: DuraformDoorForCart) => {
    const index = this.formData.doors.indexOf(door);

    if (index >= 0) {
      this.formData.doors.splice(index, 1);
    }
  };

  removePantryDoor = (pantryDoor: PantryDoorForCart) => {
    const index = this.formData.pantryDoors.indexOf(pantryDoor);

    if (index >= 0) {
      this.formData.pantryDoors.splice(index, 1);
    }
  };

  removeEndPanel = (endPanel: EndPanelForCart) => {
    const index = this.formData.endPanels.indexOf(endPanel);

    if (index >= 0) {
      this.formData.endPanels.splice(index, 1);
    }
  };

  removeDuraformDrawer = (drawer: DuraformDrawerForCart) => {
    const index = this.formData.duraformDrawers.indexOf(drawer);

    if (index >= 0) {
      this.formData.duraformDrawers.splice(index, 1);
    }
  };

  saveDraft = () => {
    const url = `${environment.baseUrl}/DuraformOrders/Drafts`;
    const draft = DuraformDraftDto.FromFormData(this.formData);

    if (this.draftId) {
      return this.http.put(`${url}/${this.draftId}`, draft);
    } else {
      return this.http
        .post<string>(`${url}`, draft)
        .pipe(map((response) => (this.draftId = response)));
    }
  };

  reset = () => {
    this.draftId = null;
    this.formData = new DuraformFormData();
  };
}
