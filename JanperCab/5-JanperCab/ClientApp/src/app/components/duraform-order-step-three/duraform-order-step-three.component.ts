import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';
import { EnquiryService } from './../../_services/enquiry.service';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
import { MachineFileService } from './../../_services/machine-file.service';
import { UploadDuraformFileDto } from './../../_models/files/UploadDuraformFileDto';
import { FileService } from './../../_services/file.service';
import { Role } from './../../_enums/Role';
import { CabinetMakerDto } from './../../_models/customer/CabinetMakerDto';
import { AuthService } from './../../_services/auth.service';
import { CustomerService } from './../../_services/customer.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DuraformOrderService } from 'src/app/_services/duraform-order.service';
import { DuraformProcessStep } from 'src/app/_enums/DuraformProcessStep';
import { CustomerType } from 'src/app/_enums/CustomerType';

@Component({
  selector: 'app-duraform-order-step-three',
  templateUrl: 'duraform-order-step-three.component.html',
})
export class DuraformOrderStepThreeComponent implements OnInit {
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  duraformEnquiry: DuraformEnquiryDto;
  role = Role;

  enquiryType = EnquiryTypeEnum;
  customerType = CustomerType;

  showInvoiceForm = false;
  showDeliveryForm = false;
  showCustomerSelector = false;
  showDeliveryDocket = false;
  showProcessViewer = false;

  cabinetMaker: CabinetMakerDto;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private enquiryService: EnquiryService,
    private router: Router,
    public auth: AuthService,
    private customerService: CustomerService,
    private layout: LayoutService,
    private dialog: DialogService,
    private machineFile: MachineFileService,
    public fileService: FileService
  ) {}

  ngOnInit() {
    this.duraformEnquiry = this.order.duraformEnquiry;

    if (!this.duraformEnquiry.id) {
      this.tryAutoFillShippingDetails();
    }

    if (this.duraformEnquiry.cabinetMakerId) {
      this.loadCabinetMaker();
    }
  }

  private tryAutoFillShippingDetails = () => {
    const { customerType } = this.auth.customer;

    if (customerType === CustomerType.CabinetMaker) {
      this.order.setCabinetMaker(this.auth.customer as CabinetMakerDto);
    }
  };

  private loadCabinetMaker = () => {
    this.layout.showLoadingPanel();
    this.customerService
      .getCabinetMaker(this.duraformEnquiry.cabinetMakerId)
      .subscribe(
        (response) => {
          this.layout.closeLoadingPanel();
          this.cabinetMaker = response;
        },
        (error) => {
          this.layout.closeLoadingPanel();
          this.dialog.error(error);
          this.dialog.error('Failed Loading Customer');
        }
      );
  };

  onSelectCabinetMaker = (maker: CabinetMakerDto) => {
    this.order.setCabinetMaker(maker);
    this.cabinetMaker = maker;
    this.showCustomerSelector = false;
  };

  onEditClick = () => {
    this.processClick.emit(DuraformProcessStep.StepTwo);
  };

  onUpdateInvoiceDetails = (values: any) => {
    this.duraformEnquiry.invoiceTo = values.invoiceTo;
    this.duraformEnquiry.invoiceAddress = values.invoiceAddress;
    this.duraformEnquiry.invoiceSuburb = values.invoiceSuburb;
    this.duraformEnquiry.invoiceState = values.invoiceState;
    this.duraformEnquiry.invoicePostcode = values.invoicePostcode;

    this.showInvoiceForm = false;
  };

  onUpdateDeliveryDetails = (values: any) => {
    this.duraformEnquiry.deliveryTo = values.deliveryTo;
    this.duraformEnquiry.deliveryAddress = values.deliveryAddress;
    this.duraformEnquiry.deliverySuburb = values.deliverySuburb;
    this.duraformEnquiry.deliveryState = values.deliveryState;
    this.duraformEnquiry.deliveryPostcode = values.deliveryPostcode;

    this.showDeliveryForm = false;
  };

  onSaveDraft = () => {
    this.saveDuraformEnquiry('Duraform Draft Saved');
  };

  onSendInOrder = () => {
    this.dialog.confirm(
      'Action Confirmation',
      'Sending in Order! This order will locked for editting. </br></br>Are you sure?',
      () => {
        this.duraformEnquiry.enquiryType = EnquiryTypeEnum.Order;
        this.duraformEnquiry.orderedDate = new Date();
        this.duraformEnquiry.notEditable = true;

        this.saveDuraformEnquiry('Duraform Order Saved');
      }
    );
  };

  private saveDuraformEnquiry = (successMsg: string) => {
    this.layout.showLoadingPanel();
    const { id } = this.duraformEnquiry;

    const { createEnquiry, updateEnquiry } = this.enquiryService;

    const request = id
      ? updateEnquiry(id, this.duraformEnquiry)
      : createEnquiry(this.duraformEnquiry);

    request.subscribe(
      (response) => {
        if (this.fileService.duraformFiles.length > 0) {
          this.fileService.uploadDuraformFiles(response.id).subscribe(
            (_) => {
              this.dialog.success(successMsg);

              if (id) {
                window.location.reload();
              } else {
                this.router.navigate([`/dashboard/duraform/${response.id}`]);
              }
            },
            (error) => {
              this.layout.closeLoadingPanel();
              this.dialog.error(error);
            }
          );
        } else {
          if (id) {
            window.location.reload();
          } else {
            this.router.navigate([`/dashboard/duraform/${response.id}`]);
          }
          this.dialog.success(successMsg);
        }
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  };

  onApproveOrder = () => {
    this.dialog.confirm(
      'Approve Order',
      'Approving Order! Are you sure?',
      () => {
        this.layout.showLoadingPanel();
        this.enquiryService
          .approveEnquiry(this.order.duraformEnquiry.id)
          .subscribe(
            (_) => {
              this.dialog.success('Order has been approved!');
              window.location.reload();
            },
            (error) => {
              this.layout.closeLoadingPanel();
              this.dialog.error(error);
            }
          );
      }
    );
  };

  onDeclineOrder = () => {
    this.dialog.confirm(
      'Decline Order',
      'Declining Order! Are you sure?',
      () => {
        console.log('Order has been declined');
      }
    );
  };

  onViewDeliveryDocket = () => {
    this.showDeliveryDocket = true;
  };

  onViewUploadedFile = (id: string) => {
    this.layout.showLoadingPanel();
    this.fileService.downloadDuraformFile(id).subscribe(
      (response) => {
        const url = window.URL.createObjectURL(response);
        window.open(url);

        this.layout.closeLoadingPanel();

        this.dialog.success('Download File Success');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Download File Failed');
      }
    );
  };

  onViewNotUploadedFile = (file: UploadDuraformFileDto) => {
    const blob = new Blob([file.file], { type: file.fileType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  onExportDuraformIcb = () => {
    this.layout.showLoadingPanel();
    this.machineFile.exportDuraformIcb(this.duraformEnquiry.id).subscribe(
      (_) => {
        this.layout.closeLoadingPanel();
        this.dialog.success('ICB File Exported Successfully');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };
}
