import { LeadingPipe } from './../../_pipes/leading.pipe';
import { DeliveryRunSheetForListDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { RunSheetService } from '../../_services/run-sheet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-page',
  templateUrl: 'delivery-page.component.html',
})
export class DeliveryPageComponent implements OnInit {
  selectedSheet: DeliveryRunSheetForListDto;
  runSheets: DeliveryRunSheetForListDto[] = [];

  isLoading = true;
  showRunSheetForm = false;
  showRunSheetPdf = false;

  constructor(
    private leadingPipe: LeadingPipe,
    private runSheetService: RunSheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.layoutService.showLoadingPanel();
    this.runSheetService.getRunSheets().subscribe(
      (response) => {
        this.runSheets = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  onSelectSheet = (sheet: DeliveryRunSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showRunSheetForm = true;
  };

  onPrintClick = (sheet: DeliveryRunSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showRunSheetForm = false;
    this.showRunSheetPdf = true;

    document.title = `RUN SHEET - ${this.selectedSheet.getBarcodePrefix()}${this.leadingPipe.transform(
      this.selectedSheet.id
    )}`;
  };

  onCloseRunSheetPdf = () => {
    this.showRunSheetPdf = false;

    if (this.selectedSheet) {
      this.showRunSheetForm = true;
    }

    document.title = 'JanperCab';
  };
}
