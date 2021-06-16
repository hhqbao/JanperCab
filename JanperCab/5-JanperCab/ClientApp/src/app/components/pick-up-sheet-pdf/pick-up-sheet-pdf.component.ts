import { DeliverySheetService } from './../../_services/delivery-sheet.service';
import { PickUpSheetDto } from './../../_models/delivery-sheet/PickUpSheetDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { LeadingPipe } from '../../_pipes/leading.pipe';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pick-up-sheet-pdf',
  templateUrl: 'pick-up-sheet-pdf.component.html',
})
export class PickUpSheetPdfComponent implements OnInit, OnDestroy {
  @Input() sheetId: number;

  isLoading = false;
  sheet: PickUpSheetDto;

  get barcode(): string {
    return `${PickUpSheetDto.BARCODE_PREFIX}${this.leadingPipe.transform(
      this.sheet.id
    )}`;
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
        this.sheet = response as PickUpSheetDto;

        document.title = `PICK UP SHEET - ${this.sheet.getBarcodePrefix()}${this.leadingPipe.transform(
          this.sheet.id
        )}`;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Load Pick Up Sheet Failed', error, null);
      }
    );
  }

  ngOnDestroy(): void {
    document.title = 'JanperCab';
  }
}
