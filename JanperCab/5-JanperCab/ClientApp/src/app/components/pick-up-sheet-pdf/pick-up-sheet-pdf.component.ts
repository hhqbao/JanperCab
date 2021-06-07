import { PickUpSheetService } from './../../_services/pick-up-sheet.service';
import { PickUpSheetForListDto } from './../../_models/pick-up-sheet/PickUpSheetForListDto';
import { DeliveryRunSheetDto } from '../../_models/delivery-run-sheet/DeliveryRunSheetDto';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
import { RunSheetService } from '../../_services/run-sheet.service';
import { DeliveryPatchDto } from '../../_models/delivery-run-sheet/DeliveryPatchDto';
import { LeadingPipe } from '../../_pipes/leading.pipe';
import { DeliveryRunSheetForListDto } from '../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-up-sheet-pdf',
  templateUrl: 'pick-up-sheet-pdf.component.html',
})
export class PickUpSheetPdfComponent implements OnInit {
  @Input() sheetId: number;

  isLoading = false;
  sheet: PickUpSheetForListDto;

  get barcode(): string {
    return `${PickUpSheetForListDto.BARCODE_PREFIX}${this.leadingPipe.transform(
      this.sheet.id
    )}`;
  }

  constructor(
    private leadingPipe: LeadingPipe,
    private sheetService: PickUpSheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.sheetService.getSheet(this.sheetId).subscribe(
      (response) => {
        this.sheet = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Load Pick Up Sheet Failed', error, null);
      }
    );
  }
}
