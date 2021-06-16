import { ShippingSheetDto } from './../../_models/delivery-sheet/ShippingSheetDto';
import { DeliverySheetDto } from 'src/app/_models/delivery-sheet/DeliverySheetDto';
import { DialogService } from '../../_services/dialog.service';

import { LayoutService } from '../../_services/layout.service';
import { DeliverySheetService } from '../../_services/delivery-sheet.service';
import { LeadingPipe } from '../../_pipes/leading.pipe';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shipping-sheet-pdf',
  templateUrl: 'shipping-sheet-pdf.component.html',
})
export class ShippingSheetPdfComponent implements OnInit, OnDestroy {
  @Input() sheetId: number;

  isLoading = false;
  deliverySheet: DeliverySheetDto;

  get barcode(): string {
    return `${ShippingSheetDto.BARCODE_PREFIX}${this.leadingPipe.transform(
      this.deliverySheet.id
    )}`;
  }

  get shippingSheet(): ShippingSheetDto {
    return this.deliverySheet as ShippingSheetDto;
  }

  constructor(
    private leadingPipe: LeadingPipe,
    private deliverySheetService: DeliverySheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.deliverySheetService.getSheet(this.sheetId).subscribe(
      (response) => {
        this.deliverySheet = response;

        document.title = `SHIPPING SHEET - ${this.deliverySheet.getBarcodePrefix()}${this.leadingPipe.transform(
          this.deliverySheet.id
        )}`;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Load Run Sheet Failed', error, null);
      }
    );
  }

  ngOnDestroy(): void {
    document.title = 'JanperCab';
  }
}
