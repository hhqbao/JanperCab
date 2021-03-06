import { EnquiryPaymentType } from './../../_enums/EnquiryPaymentType';
import { DuraformEnquiryPriceDto } from './../../_models/enquiry/DuraformEnquiryPriceDto';
import { InvoiceService } from './../../_services/invoice.service';
import { MachineService } from './../../_services/machine.service';
import { EnquiryTypeEnum } from './../../_enums/EnquiryTypeEnum';
import { EnquiryService } from './../../_services/enquiry.service';
import { DuraformEnquiryDto } from './../../_models/enquiry/DuraformEnquiryDto';
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
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';

@Component({
  selector: 'app-duraform-order-step-three',
  templateUrl: 'duraform-order-step-three.component.html',
})
export class DuraformOrderStepThreeComponent implements OnInit {
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  role = Role;

  enquiryType = EnquiryTypeEnum;
  enquiryPaymentType = EnquiryPaymentType;
  customerType = CustomerType;

  forceEditPrice = false;
  showInvoiceForm = false;
  showDeliveryForm = false;
  showCustomerSelector = false;
  showDeliveryDocket = false;
  showProcessViewer = false;
  showInvoicePdf = false;
  showTotalPriceConfirmDialog = false;
  showCashPaymentMaker = false;

  customer: CustomerDto;

  get canEditPrice(): boolean {
    if (this.forceEditPrice) {
      return true;
    }

    return (
      this.auth.isInRole(Role.Sale) &&
      this.duraformEnquiry.enquiryType !== EnquiryTypeEnum.Order
    );
  }

  get canEditDeliveryFee(): boolean {
    return (
      this.canEditPrice &&
      this.duraformEnquiry.isShippingRequired &&
      !this.duraformEnquiry.hasFixedPrice
    );
  }

  get canEditComponentPrice(): boolean {
    return this.canEditPrice && !this.duraformEnquiry.hasFixedPrice;
  }

  get canMakeCashPayment(): boolean {
    if (
      this.duraformEnquiry.enquiryPaymentType === EnquiryPaymentType.Account
    ) {
      return false;
    }

    return this.duraformEnquiry.paidAmount < this.duraformEnquiry.totalPrice;
  }

  get canViewInvoiceSection(): boolean {
    switch (this.duraformEnquiry.enquiryPaymentType) {
      case EnquiryPaymentType.Account:
        return this.duraformEnquiry.hasBeenDelivered && !this.forceEditPrice;
      case EnquiryPaymentType.CBD:
        return this.duraformEnquiry.hasBeenInvoiced && !this.forceEditPrice;
    }
  }

  get duraformEnquiry(): DuraformEnquiryDto {
    return this.order.duraformEnquiry;
  }

  get miscItemTotalPrice(): number {
    let totalPrice = 0;

    this.duraformEnquiry.miscComponents.forEach(
      (x) => (totalPrice += x.totalPrice)
    );

    return totalPrice;
  }

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private enquiryService: EnquiryService,
    private router: Router,
    public auth: AuthService,
    private customerService: CustomerService,
    private layout: LayoutService,
    private dialog: DialogService,
    private machineService: MachineService,
    public fileService: FileService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    if (!this.duraformEnquiry.id) {
      this.tryAutoFillShippingDetails();
    }

    if (this.duraformEnquiry.customerId) {
      this.loadCabinetMaker();
    }
  }

  private tryAutoFillShippingDetails = () => {
    const { customerType } = this.auth.customer;

    if (customerType === CustomerType.CabinetMaker) {
      this.order.setCustomer(this.auth.customer as CabinetMakerDto);
    }
  };

  private loadCabinetMaker = () => {
    this.layout.showLoadingPanel();
    this.customerService.getCustomer(this.duraformEnquiry.customerId).subscribe(
      (response) => {
        this.layout.closeLoadingPanel();
        this.customer = response;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Failed Loading Customer');
      }
    );
  };

  onSelectCustomer = (maker: CabinetMakerDto) => {
    this.order.setCustomer(maker);
    this.customer = maker;
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

  onToggleForceEditPrice = () => {
    if (this.forceEditPrice) {
      this.layout.showLoadingPanel();
      this.enquiryService.getDuraformEnquiry(this.duraformEnquiry.id).subscribe(
        (response) => {
          this.order.duraformEnquiry = response;

          this.forceEditPrice = false;
          this.layout.closeLoadingPanel();
        },
        (error) => {
          this.layout.closeLoadingPanel();
          this.dialog.alert('Error Occured', error, null);
        }
      );
    } else {
      this.forceEditPrice = true;
    }
  };

  onToBePricedChange = () => {
    if (this.duraformEnquiry.hasBeenInvoiced) {
      return;
    }

    if (
      this.duraformEnquiry.id &&
      this.duraformEnquiry.enquiryType === EnquiryTypeEnum.Order
    ) {
      this.forceEditPrice = true;
    }
  };

  onShippingRequireChange = () => {
    if (this.duraformEnquiry.hasBeenInvoiced) {
      return;
    }

    this.duraformEnquiry.toggleShippingRequired();

    if (
      this.duraformEnquiry.id &&
      this.duraformEnquiry.enquiryType === EnquiryTypeEnum.Order
    ) {
      this.forceEditPrice = true;
    }
  };

  onHasFixedPriceChange = () => {
    if (this.duraformEnquiry.hasBeenInvoiced) {
      return;
    }

    if (!this.duraformEnquiry.hasFixedPrice) {
      this.duraformEnquiry.calculatePrice(false);
    }

    if (
      this.duraformEnquiry.id &&
      this.duraformEnquiry.enquiryType === EnquiryTypeEnum.Order
    ) {
      this.forceEditPrice = true;
    }
  };

  onUpdatePrice = () => {
    if (!this.forceEditPrice || this.duraformEnquiry.hasBeenInvoiced) {
      return;
    }

    this.dialog.confirm(
      'Action Confirmation',
      'Updating New Prices. </br></br>Are you sure?',
      () => {
        const model = new DuraformEnquiryPriceDto(this.duraformEnquiry);

        this.layout.showLoadingPanel();
        const { id } = this.duraformEnquiry;

        this.enquiryService.updateEnquiryPriceOnly(id, model).subscribe(
          (_) => {
            this.dialog.success('Prices have been updated');

            window.location.reload();
          },
          (error) => {
            this.dialog.error(error);
            this.layout.closeLoadingPanel();
          }
        );
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
        this.enquiryService.approveEnquiry(this.duraformEnquiry.id).subscribe(
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
        this.layout.showLoadingPanel();
        this.enquiryService.declineEnquiry(this.duraformEnquiry.id).subscribe(
          (_) => {
            this.duraformEnquiry.enquiryType = EnquiryTypeEnum.Draft;
            this.duraformEnquiry.orderedDate = null;
            this.duraformEnquiry.approvedDate = null;

            this.dialog.success('Order has been declined!');
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
    this.machineService.exportDuraformIcb(this.duraformEnquiry.id).subscribe(
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

  onMakeCashPayment = (amount: number) => {
    this.showCashPaymentMaker = false;
    this.layout.showLoadingPanel();
    this.enquiryService
      .makeCashPayment(this.duraformEnquiry.id, amount)
      .subscribe(
        (response) => {
          this.duraformEnquiry.cashOrderPayments.push(response);

          this.layout.closeLoadingPanel();
          this.dialog.success('Payment has been made successfully.');
        },
        (error) => {
          this.layout.closeLoadingPanel();
          this.dialog.alert('Make Payment Failed', error, null);
        }
      );
  };

  onGeneratingInvoice = () => {
    this.dialog.confirm(
      'Invoicing',
      'Invoice will be issued and sent to customer.<br/><br/>Are you sure?',
      () => {
        if (this.duraformEnquiry.toBePriced) {
          this.showTotalPriceConfirmDialog = true;
        } else {
          this.generateInvoice();
        }
      }
    );
  };

  generateInvoice = () => {
    this.layout.showLoadingPanel();
    this.invoiceService.createInvoice(this.duraformEnquiry.id).subscribe(
      (response) => {
        this.duraformEnquiry.invoice = response;
        this.layout.closeLoadingPanel();
        this.showInvoicePdf = true;
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };
}
