import { DuraformPriceHeightHeader } from './../../_models/duraform-price/DuraformPriceHeightHeader';
import { DuraformPriceWidthHeader } from './../../_models/duraform-price/DuraformPriceWidthHeader';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-price-display-table',
  templateUrl: 'duraform-price-display-table.component.html',
})
export class DuraformPriceDisplayTableComponent implements OnInit {
  @Input() priceList: DuraformPriceGridDto[] = [];

  widthHeaders: DuraformPriceWidthHeader[] = [];
  heightHeaders: DuraformPriceHeightHeader[] = [];

  constructor() {}

  ngOnInit() {
    this.priceList.forEach((x) => {
      if (
        !this.widthHeaders.some(
          (y) => y.minWidth === x.minWidth && y.maxWidth === x.maxWidth
        )
      )
        this.widthHeaders.push({
          minWidth: x.minWidth,
          maxWidth: x.maxWidth,
        });

      if (
        !this.heightHeaders.some(
          (y) => y.minHeight === x.minHeight && y.maxHeight === x.maxHeight
        )
      )
        this.heightHeaders.push({
          minHeight: x.minHeight,
          maxHeight: x.maxHeight,
        });
    });
  }

  getPrice = (
    heightHeader: DuraformPriceHeightHeader,
    widthHeader: DuraformPriceWidthHeader
  ) => {
    const price = this.priceList.find(
      (x) =>
        x.minHeight === heightHeader.minHeight &&
        x.maxHeight === heightHeader.maxHeight &&
        x.minWidth === widthHeader.minWidth &&
        x.maxWidth === widthHeader.maxWidth
    );

    return price ? price.price : -1;
  };
}
