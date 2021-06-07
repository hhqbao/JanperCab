import { forkJoin } from 'rxjs';
import { PickUpSheetDto } from './../../_models/pick-up-sheet/PickUpSheetDto';
import { PickUpSheetService } from './../../_services/pick-up-sheet.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { PickUpSheetForListDto } from './../../_models/pick-up-sheet/PickUpSheetForListDto';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/_enums/Role';
import { LeadingPipe } from 'src/app/_pipes/leading.pipe';
import { DialogService } from 'src/app/_services/dialog.service';
import { EnquiryService } from 'src/app/_services/enquiry.service';
import { LayoutService } from 'src/app/_services/layout.service';
import * as scanner from 'onscan.js';
import { DuraformArchService } from 'src/app/_services/duraform-arch.service';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformComponentService } from 'src/app/_services/duraform-component.service';
import { DuraformDesignService } from 'src/app/_services/duraform-design.service';
import { DuraformDrawerTypeService } from 'src/app/_services/duraform-drawer-type.service';
import { DuraformEdgeProfileService } from 'src/app/_services/duraform-edge-profile.service';
import { DuraformOptionTypeService } from 'src/app/_services/duraform-option-type.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DuraformWrapColorService } from 'src/app/_services/duraform-wrap-color.service';
import { DuraformWrapTypeService } from 'src/app/_services/duraform-wrap-type.service';
import { HingeHoleService } from 'src/app/_services/hinge-hole.service';
import { PantryDoorChairRailTypeService } from 'src/app/_services/pantry-door-chair-rail-type.service';

@Component({
  selector: 'app-pick-up-page',
  templateUrl: 'pick-up-page.component.html',
})
export class PickUpPageComponent implements OnInit {
  selectedSheet: PickUpSheetForListDto = null;
  sheets: PickUpSheetForListDto[] = [];
  scannedEnquiryId: number = null;

  isLoading = true;
  canScan = true;

  showSheetForm = false;
  showSheetPdf = false;
  role = Role;

  constructor(
    private leadingPipe: LeadingPipe,
    private pickUpService: PickUpSheetService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    document.title = 'Pick Up Process';

    this.layoutService.showLoadingPanel();

    this.pickUpService.getSheets().subscribe(
      (response) => {
        this.sheets = response;
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

  onPrintClick = (sheet: PickUpSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showSheetForm = false;
    this.showSheetPdf = true;

    document.title = `PICKUP SHEET - ${this.selectedSheet.getBarcodePrefix()}${this.leadingPipe.transform(
      this.selectedSheet.id
    )}`;
  };

  onCloseSheetForm = () => {
    this.showSheetForm = false;
    this.canScan = true;

    setTimeout(() => {
      this.initializeScanner();
    });
  };

  onCloseSheetPdf = () => {
    this.showSheetPdf = false;
    this.showSheetForm = true;
  };

  onSelectSheet = (sheet: PickUpSheetForListDto) => {
    this.selectedSheet = sheet;
    this.showSheetForm = true;
    this.canScan = false;
  };

  onDeleteSheet = (sheet: PickUpSheetForListDto) => {
    this.dialogService.confirm('Delete Pick Up Sheet', 'Are you sure?', () => {
      this.isLoading = true;
      this.canScan = false;
      this.layoutService.showLoadingPanel();
      this.pickUpService.deleteSheet(sheet.id).subscribe(
        (_) => {
          const index = this.sheets.indexOf(sheet);
          this.sheets.splice(index, 1);

          this.layoutService.closeLoadingPanel();
          this.dialogService.alert(
            'Action Complete',
            'Pick Up Sheet has been deleted',
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

  onScan = (sCode: any, sQty: any) => {
    if (!this.canScan) {
      this.dialogService.error(
        'Scanner is busy! Please complete your current action.'
      );
      return;
    }

    const sheetCode = sCode as string;

    this.canScan = false;

    if (sheetCode.includes(PickUpSheetDto.BARCODE_PREFIX)) {
      const sheetId = Number(
        sheetCode.replace(PickUpSheetDto.BARCODE_PREFIX, '')
      );
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.pickUpService.getSheet(sheetId).subscribe(
        (response) => {
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();

          this.selectedSheet = response;
          this.showSheetForm = true;
        },
        (error) => {
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Invalid Action', error, () => {
            this.isLoading = false;
            this.canScan = true;
          });
        }
      );
    } else {
      const enquiryId = Number(sheetCode);
      this.scannedEnquiryId = enquiryId;
    }
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
