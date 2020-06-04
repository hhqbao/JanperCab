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

  get hasFixedEdgeProfile(): boolean {
    return !!this.selectedDesign.fixedEdgeProfileId;
  }

  constructor() {}

  submitStepOne = (model: StepOneReturnValue) => {
    this.selectedDesign = { ...model.design };
    this.selectedSerie = { ...model.serie };
    this.isRoutingOnly = model.isRoutingOnly;
    this.selectedWrapType = model.wrapType ? { ...model.wrapType } : null;
    this.selectedWrapColor = model.wrapColor ? { ...model.wrapColor } : null;
  };

  selectEdgeProfile = (model: DuraformEdgeProfileForList) => {
    this.selectedEdgeProfile = { ...model };
  };

  reset = () => {
    this.selectedDesign = null;
    this.selectedSerie = null;
    this.isRoutingOnly = null;
    this.selectedWrapType = null;
    this.selectedWrapColor = null;
    this.selectedEdgeProfile = null;
  };
}
