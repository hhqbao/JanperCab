import { MachineFileService } from './../../_services/machine-file.service';
import { UploadDuraformFileDto } from './../../_models/files/UploadDuraformFileDto';
import { DuraformFileDto } from './../../_models/application-file/DuraformFileDto';
import { FileService } from './../../_services/file.service';
import { OrderStatus } from './../../_enums/OrderStatus';
import { Role } from './../../_enums/Role';
import { CabProService } from './../../_services/cab-pro.service';
import { DuraformDraftDto } from './../../_models/duraform-order/DuraformDraftDto';
import { DuraformOrderDto } from './../../_models/duraform-order/DuraformOrderDto';
import { DuraformDraftService } from './../../_services/duraform-draft.service';
import { DuraformOrderTypeKey } from './../../_enums/DuraformOrderTypeKey';
import { DuraformJobService } from './../../_services/duraform-job.service';
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
import { DeliveryDocketDto } from 'src/app/_models/pdf-form-model/DeliveryDocketDto';
import { CabProDuraformDto } from 'src/app/_models/cab-pro/CabProDuraformDto';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-duraform-order-step-three',
  templateUrl: 'duraform-order-step-three.component.html',
})
export class DuraformOrderStepThreeComponent implements OnInit {
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  role = Role;
  orderStatus = OrderStatus;
  orderType = DuraformOrderTypeKey;
  customerType = CustomerType;

  showInvoiceForm = false;
  showDeliveryForm = false;
  showCustomerSelector = false;

  deliveryDocketData: DeliveryDocketDto;
  showDeliveryDocket = false;

  cabinetMaker: CabinetMakerDto;

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private draftService: DuraformDraftService,
    private job: DuraformJobService,
    private router: Router,
    public auth: AuthService,
    private customerService: CustomerService,
    private layout: LayoutService,
    private dialog: DialogService,
    private cabPro: CabProService,
    private machineFile: MachineFileService,
    public fileService: FileService
  ) {}

  ngOnInit() {
    if (!this.order.duraformId) {
      this.tryAutoFillShippingDetails();
    }

    if (this.order.cabinetMakerId) {
      this.loadCabinetMaker();
    }
  }

  private tryAutoFillShippingDetails = () => {
    const { customerType } = this.auth.customer;

    if (customerType === CustomerType.CabinetMaker) {
      this.order.cabinetMaker = this.auth.customer as CabinetMakerDto;
    }
  };

  private loadCabinetMaker = () => {
    this.layout.showLoadingPanel();
    this.customerService.getCabinetMaker(this.order.cabinetMakerId).subscribe(
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
    this.order.cabinetMaker = maker;
    this.cabinetMaker = maker;
    this.showCustomerSelector = false;
  };

  onEditClick = () => {
    this.processClick.emit(DuraformProcessStep.StepTwo);
  };

  onUpdateInvoiceDetails = (values: any) => {
    this.order.invoiceTo = values.invoiceTo;
    this.order.invoiceAddress = values.invoiceAddress;
    this.order.invoiceSuburb = values.invoiceSuburb;
    this.order.invoiceState = values.invoiceState;
    this.order.invoicePostcode = values.invoicePostcode;

    this.showInvoiceForm = false;
  };

  onUpdateDeliveryDetails = (values: any) => {
    this.order.deliveryTo = values.deliveryTo;
    this.order.deliveryAddress = values.deliveryAddress;
    this.order.deliverySuburb = values.deliverySuburb;
    this.order.deliveryState = values.deliveryState;
    this.order.deliveryPostcode = values.deliveryPostcode;

    this.showDeliveryForm = false;
  };

  onSaveDraft = () => {
    this.layout.showLoadingPanel();

    const { create, update } = this.draftService;
    const { duraformId, form } = this.order;

    const request = duraformId ? update(duraformId, form) : create(form);

    request.subscribe(
      (response) => {
        if (this.fileService.duraformFiles.length > 0) {
          this.fileService.uploadDuraformFiles(response.id).subscribe(
            (_) => {
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() =>
                  this.router.navigate([`dashboard/duraform/1/${response.id}`])
                );
              this.dialog.success('Draft has been saved!');
              this.layout.closeLoadingPanel();
            },
            (error) => {
              this.layout.closeLoadingPanel();
              this.dialog.error(error);
            }
          );
        } else {
          this.router.navigate([`dashboard/duraform/1/${response.id}`]);
          this.dialog.success('Draft has been saved!');
          this.layout.closeLoadingPanel();
        }
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };

  onSendInQuote = () => {
    this.layout.showLoadingPanel();

    const { duraformId, sendInQuote } = this.order;

    const request = !duraformId ? sendInQuote : null;

    request().subscribe(
      (quoteDto) => {
        this.router.navigate([`dashboard/duraform/quote/${quoteDto.id}`]);
        this.dialog.success('Quote has been sent!');
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
        this.layout.closeLoadingPanel();
      }
    );
  };

  onSendInOrder = () => {
    this.dialog.confirm(
      'Action Confirmation',
      'Sending in Order! Are you sure?',
      () => {
        this.layout.showLoadingPanel();

        const { duraformId, form } = this.order;
        const { create, draftToOrder } = this.job;

        const request = !duraformId
          ? create(form as DuraformOrderDto)
          : draftToOrder(duraformId, form as DuraformDraftDto);

        request.subscribe(
          (orderDto) => {
            if (this.fileService.duraformFiles.length > 0) {
              this.fileService.uploadDuraformFiles(orderDto.id).subscribe(
                (_) => {
                  this.router.navigate([
                    `dashboard/duraform/${DuraformOrderTypeKey.Order}/${orderDto.id}`,
                  ]);
                  this.dialog.success('Order has been submitted!');
                },
                (error) => {
                  this.layout.closeLoadingPanel();
                  this.dialog.error(error);
                }
              );
            } else {
              this.router.navigate([
                `dashboard/duraform/${DuraformOrderTypeKey.Order}/${orderDto.id}`,
              ]);
              this.dialog.success('Order has been submitted!');
            }
          },
          (error) => {
            this.dialog.error(error);
            this.dialog.error('Failed Creating Order');
            this.layout.closeLoadingPanel();
          }
        );
      }
    );
  };

  onApproveOrder = () => {
    this.dialog.confirm(
      'Approve Order',
      'Approving Order! Are you sure?',
      () => {
        this.layout.showLoadingPanel();
        this.job.distributorApprove(this.order.duraformId).subscribe(
          (response) => {
            this.dialog.success('Order has been approved!');
            this.layout.closeLoadingPanel();
            this.order.orderStatus = response;
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
    const { order } = this;

    this.deliveryDocketData = new DeliveryDocketDto();

    this.deliveryDocketData.duraformForm = order.form;
    this.deliveryDocketData.duraformDesign = order.selectedDesign.name;
    this.deliveryDocketData.duraformSerie = order.selectedSerie.name;
    this.deliveryDocketData.duraformWrapType = order.selectedWrapType?.name;
    this.deliveryDocketData.duraformWrapColor = order.selectedWrapColor?.name;
    this.deliveryDocketData.duraformEdgeProfile =
      order.selectedEdgeProfile.name;
    this.deliveryDocketData.hingeHoleType = order.selectedHingeHoleType?.name;
    this.deliveryDocketData.duraformArch = order.selectedArch?.name;

    this.deliveryDocketData.edgeProfiles = this.asset.edgeProfiles;
    this.deliveryDocketData.pantryDoorChairRailTypes = this.asset.pantryDoorChairRailTypes;
    this.deliveryDocketData.duraformDrawerTypes = this.asset.duraformDrawerTypes;

    this.showDeliveryDocket = true;
  };

  onExportCapProExcel = () => {
    if (!this.order.isOrder) {
      this.dialog.warning('Only Order Allowed');
      return;
    }

    this.layout.showLoadingPanel();

    const { order, asset } = this;

    const data = new CabProDuraformDto();
    data.duraformOrder = order.form as DuraformOrderDto;

    data.cabinetMaker = this.cabinetMaker;
    data.duraformDesign = order.selectedDesign.name;
    data.duraformSerie = order.selectedSerie.name;
    data.duraformWrapType = order.selectedWrapType?.name;
    data.duraformWrapColor = order.selectedWrapColor?.name;
    data.duraformEdgeProfile = order.selectedEdgeProfile.name;
    data.hingeHoleType = order.selectedHingeHoleType?.name;
    data.duraformArch = order.selectedArch?.name;

    data.edgeProfiles = asset.edgeProfiles;
    data.pantryDoorChairRailTypes = asset.pantryDoorChairRailTypes;
    data.duraformDrawerTypes = asset.duraformDrawerTypes;

    const blobFile = this.cabPro.exportExcel(data);
    saveAs(
      blobFile,
      `DF-${this.cabinetMaker.name
        .substring(0, 9)
        .toUpperCase()}-${order.customerOrderNumber.toUpperCase()}.xlsx`
    );

    this.layout.closeLoadingPanel();
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

  onExportIcbFile = () => {
    this.layout.showLoadingPanel();
    this.machineFile.exportIcb(this.order.duraformId).subscribe(
      (_) => {
        this.layout.closeLoadingPanel();
        this.dialog.success('ICB file has been exported!');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };
}
