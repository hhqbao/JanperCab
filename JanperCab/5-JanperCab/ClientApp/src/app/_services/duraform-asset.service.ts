import { DialogService } from './dialog.service';
import { DuraformPriceGridDto } from './../_models/duraform-price/DuraformPriceGridDto';
import { MiscItemDto } from './../_models/duraform-misc/MiscItemDto';

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

@Injectable({ providedIn: 'root' })
export class DuraformAssetService {
  static instance: DuraformAssetService;

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
  priceGrids: DuraformPriceGridDto[] = [];

  constructor(private dialog: DialogService) {
    DuraformAssetService.instance = this;
  }

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

  getBasePrice = (serieId: number, totalHeight: number, totalWidth: number) => {
    let priceGrid =
      this.priceGrids.find(
        (x) =>
          x.duraformSerieId === serieId &&
          x.minHeight <= totalHeight &&
          x.maxHeight >= totalHeight &&
          x.minWidth <= totalWidth &&
          x.maxWidth >= totalWidth
      ) ??
      this.priceGrids.find(
        (x) =>
          x.duraformSerieId === serieId &&
          x.minHeight <= totalWidth &&
          x.maxHeight >= totalWidth &&
          x.minWidth <= totalHeight &&
          x.maxWidth >= totalHeight
      );

    if (priceGrid) return priceGrid.price;

    this.dialog.alert(
      'Price Out Of Range',
      `${totalHeight} x ${totalWidth} size is out of price range! Please supply price data for this range!`,
      null
    );

    return 0;
  };
}
