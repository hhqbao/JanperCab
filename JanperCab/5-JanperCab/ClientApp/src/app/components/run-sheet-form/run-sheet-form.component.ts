import { EnquiryForRunSheetDto } from './../../_models/enquiry/EnquiryForRunSheetDto';
import { MachineService } from './../../_services/machine.service';
import { RunSheetService } from './../../_services/run-sheet.service';
import { DeliveryRunSheetForListDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from './../../_services/dialog.service';
import { DriverDto } from './../../_models/driver/DriverDto';
import { LayoutService } from './../../_services/layout.service';
import { DriverService } from './../../_services/driver.service';
import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as scanner from 'onscan.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-run-sheet-form',
  templateUrl: 'run-sheet-form.component.html',
})
export class RunSheetFormComponent implements OnInit, OnDestroy {
  @Input() selectedSheet: DeliveryRunSheetForListDto;
  @Input() runSheets: DeliveryRunSheetForListDto[];

  @Output() printBtnClick = new EventEmitter<DeliveryRunSheetForListDto>();
  @Output() closeBtnClick = new EventEmitter();

  isLoading = true;
  drivers: DriverDto[] = [];
  driverIdControl: FormControl;

  constructor(
    private driverService: DriverService,
    private runSheetService: RunSheetService,
    private machineService: MachineService,
    private layoutService: LayoutService,
    private dialogService: DialogService
  ) {}

  get disableChangingDriver(): boolean {
    if (this.selectedSheet && this.selectedSheet.lockedDate) {
      return true;
    }

    return false;
  }

  ngOnInit() {
    this.layoutService.showLoadingPanel();

    this.driverService.getAll().subscribe(
      (response) => {
        this.drivers = response;
        this.driverIdControl = new FormControl(
          this.selectedSheet ? this.selectedSheet.driverId : this.drivers[0].id,
          [Validators.required]
        );
        scanner.attachTo(document, {
          onScan: this.onScan,
        });

        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
      },
      (error) => {
        this.layoutService.closeLoadingPanel();
        this.dialogService.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    scanner.detachFrom(document);
  }

  onPrint = () => {
    if (!this.selectedSheet) {
      return;
    }

    if (this.selectedSheet.lockedDate) {
      this.printBtnClick.emit(this.selectedSheet);
    } else {
      this.dialogService.confirm(
        'Locking Run Sheet',
        'Run Sheet will be locked for editing! <br><br> Are you sure?',
        () => {
          this.isLoading = true;
          this.layoutService.showLoadingPanel();
          this.runSheetService.lockRunSheet(this.selectedSheet.id).subscribe(
            (response) => {
              this.selectedSheet.lockedDate = response;
              this.isLoading = false;
              this.layoutService.closeLoadingPanel();
              this.printBtnClick.emit(this.selectedSheet);
            },
            (error) => {
              this.isLoading = false;
              this.layoutService.closeLoadingPanel();
              this.dialogService.alert('Invalid Action', error, null);
            }
          );
        }
      );
    }
  };

  onSelectDriver = () => {
    if (!this.selectedSheet) {
      return;
    }

    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.runSheetService
      .changeDriver(this.selectedSheet.id, this.driverIdControl.value)
      .subscribe(
        (response) => {
          this.selectedSheet.driver = response;
          this.selectedSheet.driverId = response.id;
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.success('Driver has been changed');
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Invalid Action', error, null);
        }
      );
  };

  onUndoDelivering = (enquiry: EnquiryForRunSheetDto) => {
    this.dialogService.confirm('Action Confirmation', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService.UndoDelivering(enquiry.enquiryId).subscribe(
        (_) => {
          const index = this.selectedSheet.enquiriesForRunSheet.indexOf(
            enquiry
          );
          this.selectedSheet.enquiriesForRunSheet.splice(index, 1);
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.success(
            'Order has been removed from delivery list'
          );
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.alert('Invalid Action', error, null);
        }
      );
    });
  };

  onScan = (sCode: any, iQty: any) => {
    const enquiryId = Number(sCode);
    const driverId = this.driverIdControl.value;

    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    if (this.selectedSheet) {
      this.addOrderToList(this.selectedSheet.id, enquiryId);
    } else {
      this.createRunSheet(driverId, (sheetId: number) => {
        this.addOrderToList(sheetId, enquiryId);
      });
    }
  };

  private addOrderToList = (sheetId: number, enquiryId: number): void => {
    this.machineService.processDelivering(sheetId, enquiryId).subscribe(
      (response) => {
        this.selectedSheet.enquiriesForRunSheet.push(response);
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.success('Order has been added');
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Add Order Failed', error, null);
      }
    );
  };

  private createRunSheet = (
    driverId: number,
    callBack: (sheetId: number) => any
  ): void => {
    this.runSheetService.createRunSheet(driverId).subscribe(
      (response) => {
        const clone = _.cloneDeep(response);
        this.runSheets.push(clone);
        this.selectedSheet = this.runSheets[this.runSheets.indexOf(clone)];
        if (callBack) {
          callBack(this.selectedSheet.id);
        }
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Create Run Sheet Failed', error, null);
      }
    );
  };
}
