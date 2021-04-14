import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { RunSheetService } from './../../_services/run-sheet.service';
import { DeliveryPatchDto } from './../../_models/delivery-run-sheet/DeliveryPatchDto';
import { LeadingPipe } from './../../_pipes/leading.pipe';
import { DeliveryRunSheetForListDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-run-sheet-pdf',
  templateUrl: 'run-sheet-pdf.component.html',
})
export class RunSheetPdfComponent implements OnInit {
  @Input() sheetId: number;

  isLoading = false;
  runSheet: DeliveryRunSheetForListDto;

  get barcode(): string {
    return `${this.runSheet.getBarcodePrefix()}${this.leadingPipe.transform(
      this.runSheet.id
    )}`;
  }

  get patches(): DeliveryPatchDto[] {
    const patches: DeliveryPatchDto[] = [];

    if (this.runSheet) {
      this.runSheet.enquiriesForRunSheet.forEach((enquiry) => {
        const existPatch = patches.find((p) => p.hasSameAddress(enquiry));

        if (existPatch) {
          existPatch.enquiriesForRunSheet.push(enquiry);
        } else {
          patches.push(new DeliveryPatchDto(enquiry));
        }
      });
    }

    return patches;
  }

  constructor(
    private leadingPipe: LeadingPipe,
    private sheetService: RunSheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.sheetService.getRunSheet(this.sheetId).subscribe(
      (response) => {
        this.runSheet = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Load Run Sheet Failed', error, null);
      }
    );
  }
}
