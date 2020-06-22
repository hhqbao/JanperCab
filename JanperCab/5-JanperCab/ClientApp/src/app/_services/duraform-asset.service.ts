import { Injectable } from '@angular/core';
import { DuraformDesignForOrderMenu } from '../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformSerieForList } from '../_models/duraform-serie/DuraformSerieForList';
import { DuraformEdgeProfileForList } from '../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformArchForList } from '../_models/duraform-arch/DuraformArchForList';
import { PantryDoorChairRailTypeForList } from '../_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeForList';
import { DuraformDrawerTypeForList } from '../_models/duraform-drawer-type/DuraformDrawerTypeForList';
import { DuraformOptionType } from '../_models/duraform-option/DuraformOptionType';

@Injectable({ providedIn: 'root' })
export class DuraformAssetService {
  arches: DuraformArchForList[] = [];
  duraformDrawerTypes: DuraformDrawerTypeForList[] = [];
  duraformOptionTypes: DuraformOptionType[] = [];
  duraformDesigns: DuraformDesignForOrderMenu[] = [];
  duraformSeries: DuraformSerieForList[] = [];
  edgeProfiles: DuraformEdgeProfileForList[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeForList[] = [];

  constructor() {}

  getEdgeProfile = (id: number) => {
    return this.edgeProfiles.find((x) => x.id === id);
  };
}
