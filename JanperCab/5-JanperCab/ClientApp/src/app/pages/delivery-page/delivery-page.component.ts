import { PickUpSheetDto } from './../../_models/delivery-sheet/PickUpSheetDto';
import { ShippingSheetDto } from './../../_models/delivery-sheet/ShippingSheetDto';
import { Role } from 'src/app/_enums/Role';
import { AuthService } from 'src/app/_services/auth.service';
import { LeadingPipe } from './../../_pipes/leading.pipe';
import { DialogService } from './../../_services/dialog.service';
import { LayoutService } from './../../_services/layout.service';
import { DeliverySheetService } from '../../_services/delivery-sheet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as scanner from 'onscan.js';
import { DeliverySheetDto } from 'src/app/_models/delivery-sheet/DeliverySheetDto';
import { DeliveryMethodEnum } from 'src/app/_enums/DeliveryMethodEnum';

@Component({
  selector: 'app-delivery-page',
  templateUrl: 'delivery-page.component.html',
})
export class DeliveryPageComponent implements OnInit, OnDestroy {
  selectedSheet: DeliverySheetDto;
  deliverySheets: DeliverySheetDto[] = [];
  scannedEnquiryId: number = null;

  isLoading = true;
  canScan = true;

  showShippingSheetForm = false;
  showShippingControlBox = false;

  showPickUpSheetForm = false;

  showSheetPdf = false;

  role = Role;
  method = DeliveryMethodEnum;

  constructor(
    private deliverySheetService: DeliverySheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    document.title = 'Delivery Process';
    this.layoutService.toggleLeftNav(true);

    this.layoutService.showLoadingPanel();

    this.deliverySheetService.getSheets().subscribe(
      (response) => {
        this.deliverySheets = response;
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

  loadSheetPdf = (sheetId: number) => {
    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.deliverySheetService.getSheet(sheetId).subscribe(
      (response) => {
        this.selectedSheet = response;

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.showSheetPdf = true;
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Error Occured', error, () => {
          this.isLoading = false;
          this.canScan = true;
        });
      }
    );
  };

  onScan = (sCode: any, sQty: any) => {
    if (!this.canScan) {
      this.dialogService.error(
        'Scanner is busy! Please complete your current action.'
      );
      return;
    }

    this.canScan = false;
    const sheetCode = sCode as string;
    const prefix = sheetCode.substring(0, 2);

    switch (prefix) {
      case ShippingSheetDto.BARCODE_PREFIX:
        const shippingSheetId = Number(
          sheetCode.replace(ShippingSheetDto.BARCODE_PREFIX, '')
        );
        const shippingSheet = this.deliverySheets.find(
          (x) => x.id === shippingSheetId
        );

        if (shippingSheet) {
          this.selectedSheet = shippingSheet;
          this.showShippingControlBox = true;
        } else {
          this.loadSheetPdf(shippingSheetId);
        }
        break;
      case PickUpSheetDto.BARCODE_PREFIX:
        const pickUpSheetId = Number(
          sheetCode.replace(PickUpSheetDto.BARCODE_PREFIX, '')
        );

        this.loadSheetPdf(pickUpSheetId);
        break;
      default:
        const enquiryId = Number(sheetCode);
        this.scannedEnquiryId = enquiryId;
        break;
    }
  };

  onSelectSheet = (sheet: DeliverySheetDto) => {
    this.selectedSheet = sheet;

    switch (this.selectedSheet.deliveryMethod) {
      case DeliveryMethodEnum.Shipping:
        this.showShippingSheetForm = true;
        break;
      case DeliveryMethodEnum.PickUp:
        this.showPickUpSheetForm = true;
        break;
    }

    this.canScan = false;
  };

  onDeleteSheet = (sheet: DeliverySheetDto) => {
    this.dialogService.confirm('Delete Delivery Sheet', 'Are you sure?', () => {
      this.isLoading = true;
      this.canScan = false;
      this.layoutService.showLoadingPanel();
      this.deliverySheetService.deleteSheet(sheet.id).subscribe(
        (_) => {
          const index = this.deliverySheets.indexOf(sheet);
          this.deliverySheets.splice(index, 1);

          this.layoutService.closeLoadingPanel();
          this.dialogService.alert(
            'Action Success',
            'Sheet has been deleted',
            () => {
              this.isLoading = false;
              this.canScan = true;
            }
          );
        },
        (error) => {
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Error Occured', error, () => {
            this.isLoading = false;
            this.canScan = true;
          });
        }
      );
    });
  };

  onPrintClick = (sheet: DeliverySheetDto) => {
    this.selectedSheet = sheet;

    switch (this.selectedSheet.deliveryMethod) {
      case DeliveryMethodEnum.Shipping:
        this.showShippingSheetForm = false;
        break;
      case DeliveryMethodEnum.PickUp:
        this.showPickUpSheetForm = false;
        break;
    }

    this.showSheetPdf = true;
  };

  onConfirmShippingSheet = () => {
    this.dialogService.confirm('Confirming Delivery', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.deliverySheetService.completeSheet(this.selectedSheet.id).subscribe(
        (_) => {
          this.deliverySheets.splice(
            this.deliverySheets.indexOf(this.selectedSheet),
            1
          );
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert(
            'Confirmed Delivery',
            'Delivery Sheet has been confirmed and completed',
            () => {
              this.selectedSheet = null;
              this.showShippingControlBox = false;
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
    this.showShippingSheetForm = false;
    this.showPickUpSheetForm = false;
    this.canScan = true;

    setTimeout(() => {
      this.initializeScanner();
    });
  };

  onCloseSheetPdf = () => {
    this.showSheetPdf = false;

    if (this.selectedSheet) {
      switch (this.selectedSheet.deliveryMethod) {
        case DeliveryMethodEnum.Shipping:
          this.showShippingSheetForm = true;
          break;
        case DeliveryMethodEnum.PickUp:
          this.showPickUpSheetForm = true;
          break;
      }
    } else {
      this.onCloseSheetForm();
    }
  };

  onCloseShippingControlBox = () => {
    this.selectedSheet = null;
    this.showShippingControlBox = false;
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
