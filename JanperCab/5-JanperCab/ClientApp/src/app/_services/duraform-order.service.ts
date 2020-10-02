import { DuraformFileDto } from './../_models/application-file/DuraformFileDto';
import { OrderStatus } from './../_enums/OrderStatus';
import { HingeHoleTypeDto } from './../_models/hinge-hole-type/HingeHoleTypeDto';
import { DuraformOrderDto } from './../_models/duraform-order/DuraformOrderDto';
import { CabinetMakerDto } from './../_models/customer/CabinetMakerDto';
import { DuraformQuoteDto } from './../_models/duraform-order/DuraformQuoteDto';
import { AuthService } from './auth.service';
import { DuraformDrawerDto } from './../_models/duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from './../_models/duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from './../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformDoorDto } from './../_models/duraform-component/DuraformDoorDto';
import { DuraformWrapColorForSelection } from './../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { DuraformWrapTypeForSelection } from './../_models/duraform-wrap-type/DuraformWrapTypeForSelection';
import { DuraformSerieForList } from './../_models/duraform-serie/DuraformSerieForList';
import { DuraformDesignForOrderMenu } from './../_models/duraform-design/DuraformDesignForOrderMenu';
import { DuraformAssetService } from './duraform-asset.service';
import { DuraformDraftDto } from './../_models/duraform-order/DuraformDraftDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DuraformArchForList } from './../_models/duraform-arch/DuraformArchForList';
import { DuraformEdgeProfileForList } from './../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { StepOneReturnValue } from '../_models/duraform-order/StepOneReturnValue';
import { Injectable } from '@angular/core';
import { DuraformFormDto } from '../_models/duraform-order/DuraformFormDto';
import { plainToClass } from 'class-transformer';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../_models/duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformComponentDto } from '../_models/duraform-component/DuraformComponentDto';
import { DuraformOrderTypeKey } from '../_enums/DuraformOrderTypeKey';
import { CustomerType } from '../_enums/CustomerType';

@Injectable({ providedIn: 'root' })
export class DuraformOrderService {
  private duraformForm: DuraformFormDto;

  constructor(
    private http: HttpClient,
    private asset: DuraformAssetService,
    private auth: AuthService
  ) {
    this.duraformForm = new DuraformDraftDto();
  }

  get form(): DuraformFormDto {
    return this.duraformForm;
  }

  set form(value: DuraformFormDto) {
    this.duraformForm = value;
  }

  get duraformId(): string {
    return this.duraformForm.id;
  }

  get isEditable(): boolean {
    return !this.duraformForm.notEditable;
  }

  get isDraft(): boolean {
    return this.duraformForm instanceof DuraformDraftDto;
  }

  get isOrder(): boolean {
    return this.duraformForm instanceof DuraformOrderDto;
  }

  get isQuote(): boolean {
    return this.duraformForm instanceof DuraformQuoteDto;
  }

  get orderStatus(): OrderStatus {
    if (this.duraformForm.orderType === DuraformOrderTypeKey.Order) {
      return (this.duraformForm as DuraformOrderDto).orderStatus;
    } else {
      return null;
    }
  }

  set orderStatus(status: OrderStatus) {
    (this.duraformForm as DuraformOrderDto).orderStatus = status;
  }

  get orderType(): DuraformOrderTypeKey {
    return this.duraformForm.orderType;
  }

  get customerOrderNumber(): string {
    return this.duraformForm.customerOrderNumber;
  }

  set customerOrderNumber(orderNumber: string) {
    this.duraformForm.customerOrderNumber = orderNumber;
  }

  set cabinetMaker(value: CabinetMakerDto) {
    this.duraformForm.cabinetMakerId = value.id;
    this.duraformForm.distributorId = value.distributorId;

    this.invoiceTo = value.invoiceTo;
    this.invoiceAddress = value.invoiceAddress;
    this.invoiceSuburb = value.invoiceSuburb;
    this.invoiceState = value.invoiceState;
    this.invoicePostcode = value.invoicePostcode;

    this.deliveryTo = value.deliveryTo;
    this.deliveryAddress = value.deliveryAddress;
    this.deliverySuburb = value.deliverySuburb;
    this.deliveryState = value.deliveryState;
    this.deliveryPostcode = value.deliveryPostcode;
  }

  get cabinetMakerId(): number {
    return this.duraformForm.cabinetMakerId;
  }

  set cabinetMakerId(value: number) {
    this.duraformForm.cabinetMakerId = value;
  }

  get invoiceTo(): string {
    return this.duraformForm.invoiceTo;
  }

  set invoiceTo(value: string) {
    this.duraformForm.invoiceTo = value;
  }

  get invoiceAddress(): string {
    return this.duraformForm.invoiceAddress;
  }

  set invoiceAddress(value: string) {
    this.duraformForm.invoiceAddress = value;
  }

  get invoiceSuburb(): string {
    return this.duraformForm.invoiceSuburb;
  }

  set invoiceSuburb(value: string) {
    this.duraformForm.invoiceSuburb = value;
  }

  get invoiceState(): string {
    return this.duraformForm.invoiceState;
  }

  set invoiceState(value: string) {
    this.duraformForm.invoiceState = value;
  }

  get invoicePostcode(): string {
    return this.duraformForm.invoicePostcode;
  }

  set invoicePostcode(value: string) {
    this.duraformForm.invoicePostcode = value;
  }

  get deliveryTo(): string {
    return this.duraformForm.deliveryTo;
  }

  set deliveryTo(value: string) {
    this.duraformForm.deliveryTo = value;
  }

  get deliveryAddress(): string {
    return this.duraformForm.deliveryAddress;
  }

  set deliveryAddress(value: string) {
    this.duraformForm.deliveryAddress = value;
  }

  get deliverySuburb(): string {
    return this.duraformForm.deliverySuburb;
  }

  set deliverySuburb(value: string) {
    this.duraformForm.deliverySuburb = value;
  }

  get deliveryState(): string {
    return this.duraformForm.deliveryState;
  }

  set deliveryState(value: string) {
    this.duraformForm.deliveryState = value;
  }

  get deliveryPostcode(): string {
    return this.duraformForm.deliveryPostcode;
  }

  set deliveryPostcode(value: string) {
    this.duraformForm.deliveryPostcode = value;
  }

  get deliveryNote(): string {
    return this.duraformForm.deliveryNote;
  }

  set deliveryNote(value: string) {
    this.duraformForm.deliveryNote = value;
  }

  get selectedDesign(): DuraformDesignForOrderMenu {
    return this.asset.getDesign(this.duraformForm.duraformDesignId);
  }

  get selectedSerie(): DuraformSerieForList {
    return this.asset.getDoorSerie(this.duraformForm.duraformSerieId);
  }

  get selectedWrapType(): DuraformWrapTypeForSelection {
    return this.asset.getWrapType(this.duraformForm.duraformWrapTypeId);
  }

  get selectedWrapColor(): DuraformWrapColorForSelection {
    return this.asset.getWrapColor(this.duraformForm.duraformWrapColorId);
  }

  get selectedHingeHoleType(): HingeHoleTypeDto {
    return this.asset.getHingeType(this.duraformForm.hingeHoleTypeId);
  }

  get selectedEdgeProfile(): DuraformEdgeProfileForList {
    return this.asset.getEdgeProfile(this.duraformForm.duraformEdgeProfileId);
  }

  get selectedArch(): DuraformArchForList {
    return this.asset.getArch(this.duraformForm.duraformArchId);
  }

  get isRoutingOnly(): boolean {
    return this.duraformForm.isRoutingOnly;
  }

  get hasFixedEdgeProfile(): boolean {
    if (!this.selectedDesign) {
      throw new Error('Duraform Design Is Null');
    } else {
      return !!this.selectedDesign.fixedEdgeProfileId;
    }
  }

  get canTickEdgeProfile(): boolean {
    if (!this.selectedEdgeProfile) {
      throw new Error('Duraform Edge Profile Is Null');
    } else {
      if (
        this.hasFixedEdgeProfile &&
        [true, false].includes(this.selectedEdgeProfile.forcedValuePerItem)
      ) {
        return false;
      }

      return true;
    }
  }

  get hingeHoleTypeId(): number {
    return this.duraformForm.hingeHoleTypeId;
  }

  set hingeHoleTypeId(typeId: number) {
    this.duraformForm.hingeHoleTypeId = typeId;

    if (!this.duraformForm.hingeHoleTypeId) {
      this.duraformForm.duraformComponents.forEach((x) => {
        if (x instanceof DuraformComponentWithOptionAndHingeHoleDto) {
          (x as DuraformComponentWithOptionAndHingeHoleDto).hingeHoleOption = null;
        }
      });
    }
  }

  get hasComponent(): boolean {
    const {
      duraformDoors,
      pantryDoors,
      endPanels,
      duraformDrawers,
    } = this.duraformForm;

    return (
      duraformDoors.length > 0 ||
      pantryDoors.length > 0 ||
      endPanels.length > 0 ||
      duraformDrawers.length > 0
    );
  }

  get componentsWithHingeHoleCount(): number {
    if (!this.hingeHoleTypeId) {
      return 0;
    }

    const doors = this.duraformForm.duraformDoors.filter(
      (x) => x.hingeHoleOption
    );

    const pantryDoors = this.duraformForm.pantryDoors.filter(
      (x) => x.hingeHoleOption
    );

    let count = 0;
    doors.forEach((x) => {
      count += x.quantity;
    });

    pantryDoors.forEach((x) => {
      count += x.quantity;
    });

    return count;
  }

  get description(): string {
    const finish = this.isRoutingOnly
      ? 'ROUTE ONLY'
      : `${this.selectedWrapType?.name} ${this.selectedWrapColor?.name}`;

    return `${this.selectedDesign?.name} - ${finish} - ${this.selectedSerie?.name}`;
  }

  get duraformDoors(): DuraformDoorDto[] {
    return [...this.duraformForm.duraformDoors];
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    return [...this.duraformForm.pantryDoors];
  }

  get endPanels(): DuraformEndPanelDto[] {
    return [...this.duraformForm.endPanels];
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    return [...this.duraformForm.duraformDrawers];
  }

  get duraformFiles(): DuraformFileDto[] {
    return this.duraformForm.duraformFiles;
  }

  submitStepOne = (model: StepOneReturnValue) => {
    this.duraformForm.duraformDesignId = model.design.id;
    this.duraformForm.duraformEdgeProfileId = model.edgeProfile.id;
    this.duraformForm.duraformSerieId = model.serie.id;
    this.duraformForm.isRoutingOnly = model.isRoutingOnly;
    this.duraformForm.duraformWrapTypeId = model.wrapType?.id;
    this.duraformForm.duraformWrapColorId = model.wrapColor?.id;
    this.duraformForm.duraformArchId = model.design.hasNoArch
      ? null
      : this.duraformForm.duraformArchId;
  };

  selectEdgeProfile = (model: DuraformEdgeProfileForList) => {
    this.duraformForm.duraformEdgeProfileId = model.id;
  };

  selectArch = (model: DuraformArchForList) => {
    this.duraformForm.duraformArchId = model ? model.id : null;
  };

  addComponent = (component: DuraformComponentDto) => {
    if (this.duraformForm.duraformComponents[0]) {
      component.sortNumber =
        this.duraformForm.duraformComponents[0].sortNumber + 1;
    } else {
      component.sortNumber = 1;
    }

    this.duraformForm.duraformComponents.unshift(component);
  };

  removeComponent = (component: DuraformComponentDto) => {
    const index = this.duraformForm.duraformComponents.indexOf(component);

    if (index >= 0) {
      this.duraformForm.duraformComponents.splice(index, 1);
    }
  };

  sendInQuote = () => {
    const url = `${environment.baseUrl}/DuraformQuotes`;
    const { duraformForm } = this;

    const quote = plainToClass(
      DuraformQuoteDto,
      JSON.parse(JSON.stringify(duraformForm))
    );
    quote.orderType = DuraformOrderTypeKey.Quote;

    return this.http.post<DuraformQuoteDto>(url, quote);
  };

  loadNewDraft = () => {
    this.duraformForm = new DuraformDraftDto();

    switch (this.auth.customer.customerType) {
      case CustomerType.Distributor:
        this.duraformForm.distributorId = this.auth.customer.id;
        break;
      case CustomerType.CabinetMaker:
        const cabinetMaker = this.auth.customer as CabinetMakerDto;

        this.duraformForm.distributorId = cabinetMaker.distributorId;
        this.duraformForm.cabinetMakerId = cabinetMaker.id;

        this.duraformForm.invoiceTo = cabinetMaker.invoiceTo;
        this.duraformForm.invoiceAddress = cabinetMaker.invoiceAddress;
        this.duraformForm.invoiceSuburb = cabinetMaker.invoiceSuburb;
        this.duraformForm.invoiceState = cabinetMaker.invoiceState;
        this.duraformForm.invoicePostcode = cabinetMaker.invoicePostcode;
        this.duraformForm.deliveryTo = cabinetMaker.deliveryTo;
        this.duraformForm.deliveryAddress = cabinetMaker.deliveryAddress;
        this.duraformForm.deliverySuburb = cabinetMaker.deliverySuburb;
        this.duraformForm.deliveryState = cabinetMaker.deliveryState;
        this.duraformForm.deliveryPostcode = cabinetMaker.deliveryPostcode;
        break;
      default:
        throw new Error('Invalid Customer Type! Contact IT Support.');
    }
  };
}
