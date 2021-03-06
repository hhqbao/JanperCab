import { DuraformDrawerTypeDto } from './../_models/duraform-drawer-type/DuraformDrawerTypeDto';
import { PantryDoorChairRailTypeDto } from './../_models/pantry-door-chair-rail-type/PantryDoorChairRailTypeDto';
import { DuraformWrapColorDto } from './../_models/duraform-wrap-color/DuraformWrapColorDto';
import { DuraformWrapTypeDto } from './../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformSerieDto } from './../_models/duraform-serie/DuraformSerieDto';
import { DuraformArchDto } from './../_models/duraform-arch/DuraformArchDto';
import { DuraformDesignDto } from './../_models/duraform-design/DuraformDesignDto';
import { DuraformEdgeProfileDto } from './../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { DuraformPriceService } from './duraform-price.service';
import { HingeHoleStyleEnum } from './../_enums/HingeHoleStyleEnum';
import { HingeHoleStyleDto } from './../_models/hinge-hole-option/HingeHoleStyleDto';
import { DialogService } from './dialog.service';
import { DuraformPriceGridDto } from './../_models/duraform-price/DuraformPriceGridDto';
import { ComponentType } from './../_enums/ComponentType';
import { DuraformComponentTypeDto } from './../_models/duraform-component/DuraformComponentType';
import { Injectable } from '@angular/core';
import { DuraformOptionTypeDto } from '../_models/duraform-option/DuraformOptionTypeDto';
import { HingeHoleTypeDto } from '../_models/hinge-hole-type/HingeHoleTypeDto';
import { DuraformMiscPriceDto } from '../_models/duraform-misc-price/DuraformMiscPriceDto';
import { forkJoin } from 'rxjs';
import { DuraformSerieTypeEnum } from '../_enums/DuraformSerieTypeEnum';

@Injectable({ providedIn: 'root' })
export class DuraformAssetService {
  static instance: DuraformAssetService;

  componentTypes: DuraformComponentTypeDto[] = [];
  arches: DuraformArchDto[] = [];
  duraformDrawerTypes: DuraformDrawerTypeDto[] = [];
  duraformOptionTypes: DuraformOptionTypeDto[] = [];
  duraformDesigns: DuraformDesignDto[] = [];
  duraformSeries: DuraformSerieDto[] = [];
  duraformWrapTypes: DuraformWrapTypeDto[] = [];
  duraformWrapColors: DuraformWrapColorDto[] = [];
  edgeProfiles: DuraformEdgeProfileDto[] = [];
  pantryDoorChairRailTypes: PantryDoorChairRailTypeDto[] = [];
  hingeHoleTypes: HingeHoleTypeDto[] = [];
  hingeHoleStyles: HingeHoleStyleDto[] = [];
  priceGrids: DuraformPriceGridDto[] = [];
  miscPrices: DuraformMiscPriceDto[] = [];

  constructor(
    private dialog: DialogService,
    private priceService: DuraformPriceService
  ) {
    DuraformAssetService.instance = this;
  }

  loadPrices = (
    isRoutingOnly: boolean,
    serieId: number,
    wrapTypeId: number,
    callBack: () => any
  ) => {
    const duraformSerie = this.getDoorSerie(serieId);

    const serieOneRequest = isRoutingOnly
      ? this.priceService.getRouteOnlyPriceGrid(DuraformSerieTypeEnum.SerieOne)
      : this.priceService.getPressPriceGrid(
          wrapTypeId,
          DuraformSerieTypeEnum.SerieOne
        );

    const plainPanelRequest = isRoutingOnly
      ? this.priceService.getRouteOnlyPriceGrid(
          DuraformSerieTypeEnum.PlainPanel
        )
      : this.priceService.getPressPriceGrid(
          wrapTypeId,
          DuraformSerieTypeEnum.PlainPanel
        );

    const selectedSerieRequest = isRoutingOnly
      ? this.priceService.getRouteOnlyPriceGrid(duraformSerie.serieTypeEnum)
      : this.priceService.getPressPriceGrid(
          wrapTypeId,
          duraformSerie.serieTypeEnum
        );

    const observables =
      serieId === 1
        ? forkJoin({
            serieOnePrices: serieOneRequest,
            plainPanelPrices: plainPanelRequest,
            miscPrices: this.priceService.getAllMiscPrices(),
          })
        : forkJoin({
            serieOnePrices: serieOneRequest,
            plainPanelPrices: plainPanelRequest,
            miscPrices: this.priceService.getAllMiscPrices(),
            selectedSeriePrices: selectedSerieRequest,
          });

    observables.subscribe(
      (responses) => {
        this.priceGrids = responses.serieOnePrices;
        this.priceGrids = this.priceGrids.concat(responses.plainPanelPrices);
        this.miscPrices = responses.miscPrices.prices;

        if (responses['selectedSeriePrices']) {
          this.priceGrids = this.priceGrids.concat(
            responses['selectedSeriePrices']
          );
        }

        callBack();
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  };

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

  getAllowedEdgeProfiles = (duraformDesign: DuraformDesignDto) => {
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

  getHingeStyle = (id: HingeHoleStyleEnum) => {
    return this.hingeHoleStyles.find((x) => x.id === id);
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

    if (priceGrid) {
      return priceGrid.price;
    }

    // this.dialog.alert(
    //   'Price Out Of Range',
    //   `${totalHeight} x ${totalWidth} size is out of price range! Please supply price data for this range!`,
    //   null
    // );

    return -1;
  };
}
