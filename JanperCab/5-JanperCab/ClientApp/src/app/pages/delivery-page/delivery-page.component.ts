import { Role } from 'src/app/_enums/Role';
import { AuthService } from 'src/app/_services/auth.service';
import { DeliveryRunSheetDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetDto';
import { LeadingPipe } from './../../_pipes/leading.pipe';
import { DeliveryRunSheetForListDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { RunSheetService } from '../../_services/run-sheet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as scanner from 'onscan.js';

@Component({
  selector: 'app-delivery-page',
  templateUrl: 'delivery-page.component.html',
})
export class DeliveryPageComponent implements OnInit, OnDestroy {
  selectedSheet: DeliveryRunSheetForListDto;
  runSheets: DeliveryRunSheetForListDto[] = [];

  isLoading = true;
  canScan = true;

  showRunSheetForm = false;
  showControlBox = false;
  showRunSheetPdf = false;
  role = Role;

  constructor(
    private leadingPipe: LeadingPipe,
    private runSheetService: RunSheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.layoutService.showLoadingPanel();
    this.runSheetService.getRunSheets().subscribe(
      (response) => {
        this.runSheets = response;
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();

        if (this.authService.isInRole(Role[Role.Driver])) {
          this.initializeScanner();
        }
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (scanner.isAttachedTo(document)) {
      scanner.detachFrom(document);
    }
  }

  onScan = (sCode: any, sQty: any) => {
    if (!this.canScan) {
      return;
    }

    this.canScan = false;
    const sheetCode = sCode as string;

    if (sheetCode.includes(DeliveryRunSheetDto.BARCODE_PREFIX)) {
      const sheetId = Number(
        sheetCode.replace(DeliveryRunSheetDto.BARCODE_PREFIX, '')
      );
      const runSheet = this.runSheets.find((x) => x.id === sheetId);

      if (runSheet) {
        this.selectedSheet = runSheet;
        this.showControlBox = true;
      } else {
        this.dialogService.alert(
          'Not Found',
          'Run Sheet Not Found Or No Longer Active',
          () => {
            this.canScan = true;
          }
        );
      }
    } else {
      this.dialogService.alert(
        'Invalid Barcode',
        'Run Sheet Barcode Invalid',
        () => {
          this.canScan = true;
        }
      );
    }
  };

  onSelectSheet = (sheet: DeliveryRunSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showRunSheetForm = true;
    this.canScan = false;
  };

  onPrintClick = (sheet: DeliveryRunSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showRunSheetForm = false;
    this.showRunSheetPdf = true;

    document.title = `RUN SHEET - ${this.selectedSheet.getBarcodePrefix()}${this.leadingPipe.transform(
      this.selectedSheet.id
    )}`;
  };

  onConfirmDelivery = () => {
    this.dialogService.confirm('Confirming Delivery', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.runSheetService.confirmDelivery(this.selectedSheet.id).subscribe(
        (response) => {
          this.runSheets.splice(this.runSheets.indexOf(this.selectedSheet), 1);
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert(
            'Confirmed Delivery',
            'Run Sheet has been confirmed and completed',
            () => {
              this.selectedSheet = null;
              this.showControlBox = false;
              this.canScan = true;
            }
          );
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Confirming Delivery Failed', error, null);
        }
      );
    });
  };

  onCloseSheetForm = () => {
    this.showRunSheetForm = false;
    this.canScan = true;

    setTimeout(() => {
      this.initializeScanner();
    });
  };

  onCloseRunSheetPdf = () => {
    this.showRunSheetPdf = false;

    if (this.selectedSheet) {
      this.showRunSheetForm = true;
    } else {
      this.onCloseSheetForm();
    }

    document.title = 'JanperCab';
  };

  onCloseControlBox = () => {
    this.selectedSheet = null;
    this.showControlBox = false;
    this.canScan = true;
  };

  private initializeScanner = () => {
    if (scanner.isAttachedTo(document)) {
      scanner.detachFrom(document);
    }

    scanner.attachTo(document, {
      onScan: this.onScan,
    });
  };
}
