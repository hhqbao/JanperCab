import { TruckDto } from './../../_models/truck/TruckDto';
import { forkJoin } from 'rxjs';
import { TruckService } from './../../_services/truck.service';
import { Role } from 'src/app/_enums/Role';
import { AuthService } from 'src/app/_services/auth.service';
import { DeliveryPatchDto } from './../../_models/delivery-run-sheet/DeliveryPatchDto';
import { EnquiryForRunSheetDto } from './../../_models/enquiry/EnquiryForRunSheetDto';
import { MachineService } from './../../_services/machine.service';
import { RunSheetService } from './../../_services/run-sheet.service';
import { DeliveryRunSheetForListDto } from './../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
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
  ElementRef,
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
  trucks: TruckDto[] = [];

  sheetForm: FormGroup;

  role = Role;

  constructor(
    private driverService: DriverService,
    private truckSerivce: TruckService,
    private runSheetService: RunSheetService,
    private machineService: MachineService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  get driverIdControl(): AbstractControl {
    return this.sheetForm.get('driverId');
  }

  get truckIdControl(): AbstractControl {
    return this.sheetForm.get('truckId');
  }

  get disableEditing(): boolean {
    if (!this.authService.isInRole(Role[Role.Driver])) {
      return true;
    }

    if (!this.selectedSheet || this.selectedSheet.isEditable) {
      return false;
    }

    return true;
  }

  get patches(): DeliveryPatchDto[] {
    if (!this.selectedSheet) {
      return [];
    }

    return this.selectedSheet.getPatchDetails();
  }

  ngOnInit() {
    this.layoutService.showLoadingPanel();

    const observables = forkJoin({
      drivers: this.driverService.getAll(),
      trucks: this.truckSerivce.getAll(),
    });

    observables.subscribe(
      (responses) => {
        this.drivers = responses.drivers;
        this.trucks = responses.trucks;
        console.log(this.selectedSheet);
        this.sheetForm = this.fb.group({
          driverId: [
            this.selectedSheet
              ? this.selectedSheet.driverId
              : this.drivers[0].id,
            [Validators.required],
          ],
          truckId: [
            this.selectedSheet ? this.selectedSheet.truckId : this.trucks[0].id,
            [Validators.required],
          ],
        });

        if (this.authService.isInRole(Role[Role.Driver])) {
          this.initializeScanner();
        }

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
    if (scanner.isAttachedTo(document)) {
      scanner.detachFrom(document);
    }
  }

  onPrint = () => {
    if (!this.selectedSheet) {
      return;
    }

    if (this.selectedSheet.lockedDate) {
      this.printBtnClick.emit(this.selectedSheet);
    } else {
      if (!this.authService.isInRole(Role[Role.Driver])) {
        this.dialogService.alert(
          'Unauthorized Action',
          'Only Drivers can lock delivery run sheets',
          null
        );
        return;
      }

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

  onSelectTruck = () => {
    if (!this.selectedSheet) {
      return;
    }

    this.isLoading = true;
    this.layoutService.showLoadingPanel();
    this.runSheetService
      .changeTruck(this.selectedSheet.id, this.truckIdControl.value)
      .subscribe(
        (response) => {
          this.selectedSheet.truck = response;
          this.selectedSheet.truckId = response.id;
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.success('Truck has been changed');
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
      this.machineService.undoDelivering(enquiry.enquiryId).subscribe(
        (_) => {
          const index =
            this.selectedSheet.enquiriesForRunSheet.indexOf(enquiry);
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

    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    if (this.selectedSheet) {
      this.addOrderToList(this.selectedSheet, enquiryId);
    } else {
      this.createRunSheet((sheet: DeliveryRunSheetForListDto) => {
        this.addOrderToList(sheet, enquiryId);
      });
    }
  };

  private addOrderToList = (
    sheet: DeliveryRunSheetForListDto,
    enquiryId: number
  ): void => {
    this.machineService.processDelivering(sheet.id, enquiryId).subscribe(
      (response) => {
        sheet.enquiriesForRunSheet.push(response);
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
    callBack: (sheet: DeliveryRunSheetForListDto) => any
  ): void => {
    const driverId = this.driverIdControl.value;
    const truckId = this.truckIdControl.value;

    this.runSheetService.createRunSheet(driverId, truckId).subscribe(
      (response) => {
        this.selectedSheet = response;
        this.runSheets.push(this.selectedSheet);

        if (callBack) {
          callBack(this.selectedSheet);
        }
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Create Run Sheet Failed', error, null);
      }
    );
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
