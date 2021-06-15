import { DuraformSerieDto } from './../../_models/duraform-serie/DuraformSerieDto';
import { DuraformWrapTypeDto } from './../../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformRouteOnlyPriceGridDto } from './../../_models/duraform-price/DuraformRouteOnlyPriceGridDto';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { Component, Input, OnInit } from '@angular/core';
import { DuraformWrapPriceGridDto } from 'src/app/_models/duraform-price/DuraformWrapPriceGridDto';

@Component({
  selector: 'app-duraform-price-list-pdf',
  templateUrl: 'duraform-price-list-pdf.component.html',
})
export class DuraformPriceListPdfComponent implements OnInit {
  @Input() finishList: DuraformWrapTypeDto[] = [];
  @Input() serieList: DuraformSerieDto[] = [];
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
