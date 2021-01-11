import { MiscItemDto } from './../_models/duraform-misc/MiscItemDto';
import { DuraformDrawerDto } from './../_models/duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from './../_models/duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from './../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformDoorDto } from './../_models/duraform-component/DuraformDoorDto';
import { ComponentType } from './../_enums/ComponentType';
import { DuraformComponentTypeDto } from './../_models/duraform-component/DuraformComponentType';
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
import { DuraformComponentDto } from '../_models/duraform-component/DuraformComponentDto';

@Injectable({ providedIn: 'root' })
export class DuraformAssetService {
  componentTypes: DuraformComponentTypeDto[] = [];
  arches: DuraformArchForList[] = [];
  miscItems: MiscItemDto[] = [];
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

  getComponentType = (id: ComponentType): DuraformComponentTypeDto => {
    return this.componentTypes.find((x) => x.id === id);
  };

  getDoorSerie = (id: number) => {
    return this.duraformSeries.find((x) => x.id === id);
  };

  getWrapType = (id: number) => {
    return this.duraformWrapTypes.find((x) => x.id === id);
  };

  getWrapColor = (id: number) => {
    return this.duraformWrapColors.find((x) => x.id === id);
  };

  getDesign = (id: number) => {
    return this.duraformDesigns.find((x) => x.id === id);
  };

  getAllowedEdgeProfiles = (duraformDesign: DuraformDesignForOrderMenu) => {
    return this.edgeProfiles.filter((x) =>
      duraformDesign.allowedEdgeProfiles.some(
        (y) => y.duraformEdgeProfileId === x.id
      )
    );
  };

  getEdgeProfile = (id: number) => {
    return this.edgeProfiles.find((x) => x.id === id);
  };

  getArch = (id: number) => {
    return this.arches.find((x) => x.id === id);
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

  getMiscItem = (id: number) => {
    return this.miscItems.find((x) => x.id === id);
  };

  generateDuraformDoor = (): DuraformDoorDto => {
    const component = new DuraformDoorDto();
    component.$type = this.getComponentType(ComponentType.DuraformDoor).type;

    return component;
  };

  generatePantryDoor = (): DuraformPantryDoorDto => {
    const component = new DuraformPantryDoorDto();
    component.$type = this.getComponentType(
      ComponentType.DuraformPantryDoor
    ).type;

    return component;
  };

  generateEndPanel = (): DuraformEndPanelDto => {
    const component = new DuraformEndPanelDto();
    component.$type = this.getComponentType(
      ComponentType.DuraformEndPanel
    ).type;

    return component;
  };

  generateDuraformDrawer = (): DuraformDrawerDto => {
    const component = new DuraformDrawerDto();
    component.$type = this.getComponentType(ComponentType.DuraformDrawer).type;

    return component;
  };
}
