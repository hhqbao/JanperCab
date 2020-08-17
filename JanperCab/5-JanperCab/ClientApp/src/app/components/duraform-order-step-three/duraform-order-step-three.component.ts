import { DuraformOrderDto } from './../../_models/duraform-order/DuraformOrderDto';
import { plainToClass } from 'class-transformer';
import { DashboardService } from './../../_services/dashboard.service';
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

@Component({
  selector: 'app-duraform-order-step-three',
  templateUrl: 'duraform-order-step-three.component.html',
})
export class DuraformOrderStepThreeComponent implements OnInit {
  @Output() processClick = new EventEmitter<DuraformProcessStep>();

  customerType = CustomerType;
  cabinetMakerList: CabinetMakerDto[] = [];
  showInvoiceForm = false;
  showDeliveryForm = false;

  deliveryDocketData: DeliveryDocketDto;
  showDeliveryDocket = false;

  get customer(): CabinetMakerDto {
    const customer = this.cabinetMakerList.find(
      (x) => x.id === this.order.cabinetMakerId
    );

    return customer;
  }

  constructor(
    public asset: DuraformAssetService,
    public order: DuraformOrderService,
    private dashboardService: DashboardService,
    private draftService: DuraformDraftService,
    private job: DuraformJobService,
    private router: Router,
    public auth: AuthService,
    private customerService: CustomerService,
    private layout: LayoutService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    if (!this.order.duraformId) {
      this.tryAutoFillShippingDetails();
    }

    this.tryLoadCabinetMakerList();
  }

  private tryAutoFillShippingDetails = () => {
    const { customerType } = this.auth.customer;

    if (customerType === CustomerType.CabinetMaker) {
      this.order.cabinetMaker = this.auth.customer as CabinetMakerDto;
    }
  };

  private tryLoadCabinetMakerList = () => {
    const { customerType } = this.auth.customer;

    if (customerType === CustomerType.Distributor) {
      this.layout.showLoadingPanel();
      this.customerService.getCabinetMakerList().subscribe(
        (response) => {
          this.layout.closeLoadingPanel();
          this.cabinetMakerList = response;
        },
        (error) => {
          this.layout.closeLoadingPanel();
          this.dialog.error(error);
          this.dialog.error('Failed Loading Customer List');
        }
      );
    }
  };

  onSelectCabinetMaker = () => {
    const selectedCabinetMaker = this.cabinetMakerList.find(
      (x) => x.id === this.order.cabinetMakerId
    );

    this.order.cabinetMaker = selectedCabinetMaker;
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
        this.dashboardService.numberOfDrafts += 1;
        this.router.navigate([`dashboard/duraform/1/${response.id}`]);
        this.layout.closeLoadingPanel();
        this.dialog.success('Draft has been saved!');
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };

  onSendInQuote = () => {
    this.layout.showLoadingPanel();

    this.order.sendInQuote().subscribe(
      (quoteDto) => {
        this.layout.closeLoadingPanel();
        this.dialog.success('Quote has been sent!');
        this.router.navigate([`dashboard/duraform/quote/${quoteDto.id}`]);
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
      }
    );
  };

  onSendInOrder = () => {
    this.layout.showLoadingPanel();

    this.job.create(this.order.form as DuraformOrderDto).subscribe(
      (orderDto) => {
        this.layout.closeLoadingPanel();
        this.dialog.success('Order has been submitted!');
        this.router.navigate([
          `dashboard/duraform/${DuraformOrderTypeKey.Order}/${orderDto.id}`,
        ]);
      },
      (error) => {
        this.layout.closeLoadingPanel();
        this.dialog.error(error);
        this.dialog.error('Failed Creating Order');
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
}
