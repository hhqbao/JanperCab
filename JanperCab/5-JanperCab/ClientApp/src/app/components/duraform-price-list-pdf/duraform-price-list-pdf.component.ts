import { DuraformPriceHeightHeader } from './../../_models/duraform-price/DuraformPriceHeightHeader';
import { DuraformPriceWidthHeader } from './../../_models/duraform-price/DuraformPriceWidthHeader';
import { forkJoin } from 'rxjs';
import { DuraformSerieService } from './../../_services/duraform-serie.service';
import { DuraformWrapTypeService } from './../../_services/duraform-wrap-type.service';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { DuraformPriceService } from './../../_services/duraform-price.service';
import { DuraformRouteOnlyPriceGridDto } from './../../_models/duraform-price/DuraformRouteOnlyPriceGridDto';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { Component, Input, OnInit } from '@angular/core';
import { DuraformWrapPriceGridDto } from 'src/app/_models/duraform-price/DuraformWrapPriceGridDto';
import { DuraformSerieForList } from 'src/app/_models/duraform-serie/DuraformSerieForList';
import { DuraformWrapTypeForSelection } from 'src/app/_models/duraform-wrap-type/DuraformWrapTypeForSelection';

@Component({
  selector: 'app-duraform-price-list-pdf',
  templateUrl: 'duraform-price-list-pdf.component.html',
})
export class DuraformPriceListPdfComponent implements OnInit {
  @Input() finishList: DuraformWrapTypeForSelection[] = [];
  @Input() serieList: DuraformSerieForList[] = [];
  @Input() priceList: DuraformPriceGridDto[] = [];

  constructor() {}

  get wrapPrices(): DuraformWrapPriceGridDto[] {
    const prices = this.priceList.filter(
      (x) => x instanceof DuraformWrapPriceGridDto
    );

    return prices as DuraformWrapPriceGridDto[];
  }

  get routeOnlyPrices(): DuraformRouteOnlyPriceGridDto[] {
    const prices = this.priceList.filter(
      (x) => x instanceof DuraformRouteOnlyPriceGridDto
    );

    return prices as DuraformRouteOnlyPriceGridDto[];
  }

  ngOnInit() {}

  getWrapPriceTable = (
    finishId: number,
    serieId: number
  ): DuraformWrapPriceGridDto[] => {
    const prices = this.wrapPrices.filter(
      (x) => x.duraformWrapTypeId === finishId && x.duraformSerieId === serieId
    );

    return prices;
  };

  getRouteOnlyPriceTable = (
    serieId: number
  ): DuraformRouteOnlyPriceGridDto[] => {
    return this.routeOnlyPrices.filter((x) => x.duraformSerieId === serieId);
  };
}
