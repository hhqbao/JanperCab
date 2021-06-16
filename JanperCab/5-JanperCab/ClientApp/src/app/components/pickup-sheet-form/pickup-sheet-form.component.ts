import { DeliverySheetService } from '../../_services/delivery-sheet.service';
import { DeliverySheetDto } from 'src/app/_models/delivery-sheet/DeliverySheetDto';
import { PickUpSheetDto } from '../../_models/delivery-sheet/PickUpSheetDto';
import { EnquiryForSheetDto } from '../../_models/enquiry/EnquiryForSheetDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { Role } from 'src/app/_enums/Role';
import { AuthService } from 'src/app/_services/auth.service';
import { MachineService } from '../../_services/machine.service';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../../_services/dialog.service';
import { LayoutService } from '../../_services/layout.service';
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
  selector: 'app-pickup-sheet-form',
  templateUrl: 'pickup-sheet-form.component.html',
})
export class PickUpSheetFormComponent implements OnInit, OnDestroy {
  @Input() selectedSheet: PickUpSheetDto;
  @Input() sheets: DeliverySheetDto[];

  @Output() printBtnClick = new EventEmitter<DeliverySheetDto>();
  @Output() closeBtnClick = new EventEmitter();

  isLoading = false;
  showCustomerSelector = false;
  selectedCustomer: CustomerDto;

  sheetForm: FormGroup;

  role = Role;

  constructor(
    private deliverySheetService: DeliverySheetService,
    private machineService: MachineService,
    private layoutService: LayoutService,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  get disableEditing(): boolean {
    if (!this.authService.isInRole(Role[Role.Driver])) {
      return true;
    }

    if (!this.selectedSheet || this.selectedSheet.isEditable) {
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

  onSelectCustomer = (customer: CustomerDto) => {
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

    if (this.selectedSheet.completedDate) {
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
          this.deliverySheetService
            .completeSheet(this.selectedSheet.id)
            .subscribe(
              (response) => {
                this.sheets.splice(this.sheets.indexOf(this.selectedSheet), 1);

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

  onUndoDelivering = (enquiry: EnquiryForSheetDto) => {
    this.dialogService.confirm('Action Confirmation', 'Are you sure?', () => {
      this.isLoading = true;
      this.layoutService.showLoadingPanel();
      this.machineService.undoDelivering(enquiry.enquiryId).subscribe(
        (_) => {
          const index = this.selectedSheet.enquiriesForSheet.indexOf(enquiry);
          this.selectedSheet.enquiriesForSheet.splice(index, 1);
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
      this.createSheet((sheet: DeliverySheetDto) => {
        this.addOrderToList(sheet, enquiryId);
      });
    }
  };

  private addOrderToList = (
    sheet: DeliverySheetDto,
    enquiryId: number
  ): void => {
    this.machineService.processDelivering(sheet.id, enquiryId).subscribe(
      (response) => {
        sheet.enquiriesForSheet.push(response);
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

  private createSheet = (callBack: (sheet: DeliverySheetDto) => any): void => {
    const model = new PickUpSheetDto();
    model.customerId = this.selectedCustomer.id;

    this.deliverySheetService.createSheet(model).subscribe(
      (response) => {
        this.selectedSheet = response as PickUpSheetDto;

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
