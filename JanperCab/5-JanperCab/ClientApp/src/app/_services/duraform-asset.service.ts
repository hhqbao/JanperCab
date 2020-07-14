import { DuraformWrapColorForSelection } from './../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { DuraformWrapTypeForSelection } from './../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { Injectable } from '@angular/core';
import { DuraformDesignForOrderMenu } from '../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformSerieForList } from '../_models/duraform-serie/DuraformSerieForList';
import { DuraformEdgeProfileForList } from '../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformArchForList } from '../_models/duraform-arch/DuraformArchForList';
import { PantryDoorChairRailTypeForList } from '../_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformDrawerTypeForList } from '../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformOptionTypeDto } from '../_models/duraform-option/DuraformOptionTypeDto';
import { HingeHoleTypeDto } from '../_models/hinge-hole-type/HingeHoleTypeDto';

@Injectable({ providedIn: 'root' })
export class DuraformAssetService {
  arches: DuraformArchForList[] = [];
  duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  duraformOptionTypes: DuraformOptionTypeDto[] = [];
  duraformDesigns: DuraformDesignForOrderMenu[] = [];
  duraformSeries: DuraformSerieForList[] = [];
  duraformWrapTypes: DuraformWrapTypeForSelection[] = [];
  duraformWrapColors: DuraformWrapColorForSelection[] = [];
  edgeProfiles: DuraformEdgeProfileForList[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  hingeHoleTypes: HingeHoleTypeDto[] = [];

  constructor() {}

  getDoorSerie(id: number) {
    return this.duraformSeries.find((x) => x.id === id);
  }

  getWrapType(id: number) {
    return this.duraformWrapTypes.find((x) => x.id === id);
  }

  getWrapColor(id: number) {
    return this.duraformWrapColors.find((x) => x.id === id);
  }

  getDesign = (id: number) => {
    return this.duraformDesigns.find((x) => x.id === id);
  };

  getEdgeProfile = (id: number) => {
    return this.edgeProfiles.find((x) => x.id === id);
  };

  getArch(id: number) {
    return this.arches.find((x) => x.id === id);
  }

  getChairRailType = (id: number) => {
    return this.pantryDoorChairRailTypes.find((x) => x.id === id);
  };

  getDrawerType = (id: number) => {
    return this.duraformDrawerTypes.find((x) => x.id === id);
  };

  getHingeType = (id: number) => {
    return this.hingeHoleTypes.find((x) => x.id === id);
  };
}
