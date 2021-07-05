import { Role } from 'src/app/_enums/Role';
import { AuthService } from './../../_services/auth.service';
import { DuraformSerieDto } from './../../_models/duraform-serie/DuraformSerieDto';
import { DuraformWrapTypeDto } from './../../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformPriceBulkAction } from './../../_models/duraform-price/DuraformPriceBulkAction';
import { DuraformPriceHeightHeader } from './../../_models/duraform-price/DuraformPriceHeightHeader';
import { DuraformPriceWidthHeader } from './../../_models/duraform-price/DuraformPriceWidthHeader';
import { DuraformPriceService } from './../../_services/duraform-price.service';
import { forkJoin } from 'rxjs';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformWrapTypeService } from '../../_services/duraform-wrap-type.service';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { DuraformPriceGridDto } from 'src/app/_models/duraform-price/DuraformPriceGridDto';
import { DuraformSerieTypeEnum } from 'src/app/_enums/DuraformSerieTypeEnum';

@Component({
  selector: 'app-duraform-price-grid-page',
  templateUrl: 'duraform-price-grid-page.component.html',
})
export class DuraformPriceGridPageComponent implements OnInit {
  isLoading = true;
  isReseting = false;

  showAllPriceList = false;
  showBulkActionControl = false;

  allPriceGrids: DuraformPriceGridDto[] = [];
  finishList: DuraformWrapTypeDto[] = [];
  serieList: DuraformSerieDto[] = [];

  priceGrids: DuraformPriceGridDto[] = null;
  widthHeaders: DuraformPriceWidthHeader[] = [];
  heightHeaders: DuraformPriceHeightHeader[] = [];

  selectedFinishId: number = null;
  selectedSerieType: DuraformSerieTypeEnum = null;

  constructor(
    private authService: AuthService,
    private finishService: DuraformWrapTypeService,
    private serieService: DuraformSerieService,
    private priceService: DuraformPriceService,
    private layout: LayoutService,
    private dialog: DialogService
  ) {}

  get changes(): number {
    if (!this.priceGrids) {
      return 0;
    }

    return this.priceGrids.filter((x) => x.price !== x.tempPrice).length;
  }

  ngOnInit() {
    if (!this.authService.isInRole(Role.Admin)) {
      this.authService.homePageNavigate();
      return;
    }

    this.layout.showLoadingPanel();

    const observables = forkJoin({
      finishes: this.finishService.getAll(),
      series: this.serieService.getAll(),
    });

    observables.subscribe(
      (responses) => {
        this.finishList = _.orderBy(responses.finishes, ['name'], ['asc']);
        this.serieList = responses.series;
        this.isLoading = false;
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.isLoading = false;
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  }

  onSelectionChange = () => {
    if (
      ![null, undefined].includes(this.selectedFinishId) &&
      ![null, undefined].includes(this.selectedSerieType)
    ) {
      this.heightHeaders = [];
      this.widthHeaders = [];

      this.isLoading = true;
      this.layout.showLoadingPanel();

      const request =
        this.selectedFinishId === 0
          ? this.priceService.getRouteOnlyPriceGrid(this.selectedSerieType)
          : this.priceService.getPressPriceGrid(
              this.selectedFinishId,
              this.selectedSerieType
            );

      request.subscribe(
        (response) => {
          this.priceGrids = response;

          this.priceGrids.forEach((priceGrid) => {
            const { minHeight, maxHeight, minWidth, maxWidth } = priceGrid;

            if (
              !this.widthHeaders.some(
                (x) => x.minWidth === minWidth && x.maxWidth === maxWidth
              )
            ) {
              this.widthHeaders.push({
                minWidth,
                maxWidth,
              });
            }

            if (
              !this.heightHeaders.some(
                (x) => x.minHeight === minHeight && x.maxHeight === maxHeight
              )
            ) {
              this.heightHeaders.push({
                minHeight,
                maxHeight,
              });
            }
          });

          this.isLoading = false;
          this.layout.closeLoadingPanel();
        },
        (error) => {
          this.isLoading = false;
          this.layout.closeLoadingPanel();
          this.dialog.error(error);
        }
      );
    }
  };

  onViewAll = () => {
    this.layout.showLoadingPanel();
    this.priceService.getAllGriPrices().subscribe(
      (response) => {
        this.allPriceGrids = response.prices;
        this.layout.closeLoadingPanel();
        this.showAllPriceList = true;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };

  getPrice = (
    heightHeader: DuraformPriceHeightHeader,
    widthHeader: DuraformPriceWidthHeader
  ) => {
    const { minHeight, maxHeight } = heightHeader;
    const { minWidth, maxWidth } = widthHeader;

    const priceGrid = this.priceGrids.find(
      (x) =>
        x.minHeight === minHeight &&
        x.maxHeight === maxHeight &&
        x.minWidth === minWidth &&
        x.maxWidth === maxWidth
    );

    return priceGrid;
  };

  onReset = () => {
    if (this.changes === 0) {
      return;
    }

    this.isReseting = true;

    this.priceGrids.forEach((priceGrid) => {
      priceGrid.tempPrice = priceGrid.price;
    });

    setTimeout(() => {
      this.isReseting = false;
    });
  };

  onBulkActionApply = (bulkAction: DuraformPriceBulkAction) => {
    this.isLoading = true;
    this.layout.showLoadingPanel();

    this.priceGrids.forEach((priceGrid) => {
      priceGrid.tempPrice = bulkAction.calculate(priceGrid.price);
    });

    this.isLoading = false;
    this.layout.closeLoadingPanel();
    this.showBulkActionControl = false;
  };

  onSave = () => {
    if (this.changes === 0) {
      this.dialog.alert('Invalid Action', 'There is nothing to save!', null);
      return;
    }

    this.dialog.confirm(
      'Saving Price Data',
      'This action cannot be undone! Are you sure?',
      () => {
        this.isLoading = true;
        this.layout.showLoadingPanel();

        const changedPricesClone = this.priceGrids.filter((x) => {
          if (x.price !== x.tempPrice || x.id === 0) {
            x.price = x.tempPrice;

            return x;
          }
        });

        this.priceService.savePriceGrid(changedPricesClone).subscribe(
          (response) => {
            response.forEach((x) => {
              const originalPriceGrid = this.priceGrids.find(
                (y) => y.id === x.id
              );

              if (originalPriceGrid) {
                originalPriceGrid.minHeight = x.minHeight;
                originalPriceGrid.maxHeight = x.maxHeight;
                originalPriceGrid.minWidth = x.minWidth;
                originalPriceGrid.maxWidth = x.maxWidth;
                originalPriceGrid.price = x.price;
                originalPriceGrid.tempPrice = x.tempPrice;
              }
            });

            this.isLoading = false;
            this.layout.closeLoadingPanel();
            this.dialog.success('Save Price Successfully!');
          },
          (error) => {
            this.isLoading = false;
            this.layout.closeLoadingPanel();
            this.dialog.error(error);
          }
        );
      }
    );
  };
}
