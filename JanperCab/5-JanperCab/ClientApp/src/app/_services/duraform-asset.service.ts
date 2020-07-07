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
  edgeProfiles: DuraformEdgeProfileForList[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];
  hingeHoleTypes: HingeHoleTypeDto[] = [];

  constructor() {}

  getEdgeProfile = (id: number) => {
    return this.edgeProfiles.find((x) => x.id === id);
  };

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
