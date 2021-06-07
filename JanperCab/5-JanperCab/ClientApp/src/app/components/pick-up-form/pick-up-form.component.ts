import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { EnquiryForPickUpSheetDto } from './../../_models/enquiry/EnquiryForPickUpSheetDto';
import { PickUpSheetService } from './../../_services/pick-up-sheet.service';
import { PickUpSheetForListDto } from './../../_models/pick-up-sheet/PickUpSheetForListDto';
import { TruckDto } from '../../_models/truck/TruckDto';
import { forkJoin } from 'rxjs';
import { TruckService } from '../../_services/truck.service';
import { Role } from 'src/app/_enums/Role';
import { AuthService } from 'src/app/_services/auth.service';
import { DeliveryPatchDto } from '../../_models/delivery-run-sheet/DeliveryPatchDto';
import { EnquiryForRunSheetDto } from '../../_models/enquiry/EnquiryForRunSheetDto';
import { MachineService } from '../../_services/machine.service';
import { RunSheetService } from '../../_services/run-sheet.service';
import { DeliveryRunSheetForListDto } from '../../_models/delivery-run-sheet/DeliveryRunSheetForListDto';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { DialogService } from '../../_services/dialog.service';
import { DriverDto } from '../../_models/driver/DriverDto';
import { LayoutService } from '../../_services/layout.service';
import { DriverService } from '../../_services/driver.service';
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
  selector: 'app-pick-up-form',
  templateUrl: 'pick-up-form.component.html',
})
export class PickUpFormComponent implements OnInit, OnDestroy {
  @Input() selectedSheet: PickUpSheetForListDto;
  @Input() sheets: PickUpSheetForListDto[];

  @Output() printBtnClick = new EventEmitter<PickUpSheetForListDto>();
  @Output() closeBtnClick = new EventEmitter();

  isLoading = false;
  showCustomerSelector = false;
  selectedCustomer: CustomerDto;

  sheetForm: FormGroup;

  role = Role;

  constructor(
    private pickUpService: PickUpSheetService,
    private machineService: MachineService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  get disableEditing(): boolean {
    if (!this.authService.isInRole(Role[Role.Driver])) {
      return true;
    }

    if (!this.selectedSheet || !this.selectedSheet.isCompleted) {
      return false;
    }

    return true;
  }

  ngOnInit() {
    if (this.selectedSheet) {
      this.selectedCustomer = this.selectedSheet.customer;
    }

    if (this.authService.isInRole(Role[Role.Driver])) {
      this.initializeScanner();
    }
  }

  ngOnDestroy(): void {
    if (scanner.isAttachedTo(document)) {
      scanner.detachFrom(document);
    }
  }

  onSelectCustomer = (customer: CabinetMakerDto) => {
    if (this.selectedSheet) {
      return;
    }

    this.selectedCustomer = customer;
    this.showCustomerSelector = false;
  };

  onPrint = () => {
    if (!this.selectedSheet) {
      return;
    }

    if (this.selectedSheet.isCompleted) {
      this.printBtnClick.emit(this.selectedSheet);
    } else {
      if (!this.authService.isInRole(Role[Role.Driver])) {
        this.dialogService.alert(
          'Unauthorized Action',
          'Only Drivers can complete pick up sheets',
          null
        );
        return;
      }

      this.dialogService.confirm(
        'Complete Sheet',
        'Pick Up Sheet will be locked for editing! <br><br> Are you sure?',
        () => {
          this.isLoading = true;
          this.layoutService.showLoadingPanel();
          this.pickUpService.completeSheet(this.selectedSheet.id).subscribe(
            (_) => {
              this.selectedSheet.isCompleted = true;
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

  onUndoPickUp = (enquiry: EnquiryForPickUpSheetDto) => {
    this.dialogService.confirm('Action Confirmation', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService.undoPickUp(enquiry.enquiryId).subscribe(
        (_) => {
          const index =
            this.selectedSheet.enquiriesForPickUpSheet.indexOf(enquiry);
          this.selectedSheet.enquiriesForPickUpSheet.splice(index, 1);
          this.isLoading = false;
          this.layoutService.closeLoadingPanel();
          this.dialogService.success(
            'Order has been removed from pick up list'
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
    if (this.isLoading) {
      this.dialogService.error(
        'Scanner is busy! Please complete your current process'
      );
      return;
    }

    if (!this.selectedCustomer) {
      this.dialogService.error('Customer is required!');
      return;
    }

    const enquiryId = Number(sCode);

    this.isLoading = true;
    this.layoutService.showLoadingPanel();

    if (this.selectedSheet) {
      this.addOrderToList(this.selectedSheet, enquiryId);
    } else {
      this.createRunSheet((sheet: PickUpSheetForListDto) => {
        this.addOrderToList(sheet, enquiryId);
      });
    }
  };

  private addOrderToList = (
    sheet: PickUpSheetForListDto,
    enquiryId: number
  ): void => {
    this.machineService.processPickUp(sheet.id, enquiryId).subscribe(
      (response) => {
        sheet.enquiriesForPickUpSheet.push(response);
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
    callBack: (sheet: PickUpSheetForListDto) => any
  ): void => {
    this.pickUpService.createSheet(this.selectedCustomer.id).subscribe(
      (response) => {
        this.selectedSheet = response;
        this.sheets.push(this.selectedSheet);

        if (callBack) {
          callBack(this.selectedSheet);
        }
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.closeLoadingPanel();
        this.dialogService.alert('Create Pick Up Sheet Failed', error, null);
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
