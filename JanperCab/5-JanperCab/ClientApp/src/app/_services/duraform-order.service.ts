import { Role } from './../_enums/Role';
import { DuraformComponentService } from 'src/app/_services/duraform-component.service';
import { DuraformMiscFingerPullDto } from './../_models/duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscCapMouldDto } from 'src/app/_models/duraform-misc-component/DuraformMiscCapMouldDto';
import { DuraformMiscLooseFoilDto } from 'src/app/_models/duraform-misc-component/DuraformMiscLooseFoilDto';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { DuraformEnquiryDto } from './../_models/enquiry/DuraformEnquiryDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { AuthService } from './auth.service';
import { DuraformAssetService } from './duraform-asset.service';
import { DuraformArchForList } from './../_models/duraform-arch/DuraformArchForList';
import { DuraformEdgeProfileForList } from './../_models/duraform-edge-profile/DuraformEdgeProfileForList';
import { StepOneReturnValue } from '../_models/duraform-order/StepOneReturnValue';
import { Injectable } from '@angular/core';
import { DuraformComponentDto } from '../_models/duraform-component/DuraformComponentDto';
import { CustomerType } from '../_enums/CustomerType';
import { DuraformComponentWithOptionDto } from '../_models/duraform-component/DuraformComponentWithOptionDto';
import { CustomerDto } from '../_models/customer/CustomerDto';

@Injectable({ providedIn: 'root' })
export class DuraformOrderService {
  duraformEnquiry: DuraformEnquiryDto;

  constructor(
    private asset: DuraformAssetService,
    private auth: AuthService,
    private componentService: DuraformComponentService
  ) {
    this.duraformEnquiry = new DuraformEnquiryDto();
  }

  get maxBoardSize(): number {
    return this.duraformEnquiry.isRoutingOnly ? 3600 : 2500;
  }

  get description(): string {
    const {
      isRoutingOnly,
      duraformWrapType,
      duraformWrapColor,
      duraformDesign,
      duraformSerie,
    } = this.duraformEnquiry;

    const finish = isRoutingOnly
      ? 'ROUTE ONLY'
      : `${duraformWrapType?.name} ${duraformWrapColor?.name}`;

    return `${duraformDesign?.name} - ${finish} - ${duraformSerie?.name}`;
  }

  submitStepOne = (model: StepOneReturnValue) => {
    this.duraformEnquiry.duraformDesignId = model.design.id;
    this.duraformEnquiry.duraformSerieId = model.serie.id;
    this.duraformEnquiry.isRoutingOnly = model.isRoutingOnly;
    this.duraformEnquiry.duraformWrapTypeId = model.wrapType?.id;
    this.duraformEnquiry.duraformWrapColorId = model.wrapColor?.id;
    this.duraformEnquiry.duraformArchId = model.design.hasNoArch
      ? null
      : this.duraformEnquiry.duraformArchId;

    this.setEdgeProfile(this.asset.getEdgeProfile(model.edgeProfile.id));

    if (this.duraformEnquiry.hasComponent) {
      if (this.duraformEnquiry.isRoutingOnly) {
        const doubleSidedComponents =
          this.duraformEnquiry.componentsWithDoubleSidedOption;

        doubleSidedComponents.forEach(
          (x) => ((x as DuraformComponentWithOptionDto).duraformOption = null)
        );

        this.duraformEnquiry.miscComponents =
          this.duraformEnquiry.miscComponents.filter(
            (x) => !(x instanceof DuraformMiscLooseFoilDto)
          );

        this.duraformEnquiry.miscComponents.forEach((misc) => {
          if (
            misc instanceof DuraformMiscCapMouldDto ||
            misc instanceof DuraformMiscFingerPullDto
          ) {
            misc.isRaw = true;
          }
        });
      }

      this.duraformEnquiry.duraformComponents.forEach((component) => {
        this.componentService.calculateComponentPrice(
          component,
          this.duraformEnquiry
        );
      });

      this.duraformEnquiry.miscComponents.forEach((misc) => {
        misc.getUnitPrice(this.duraformEnquiry);
      });
    }
  };

  setCustomer = (customer: CustomerDto) => {
    this.duraformEnquiry.customerId = customer.id;
    this.duraformEnquiry.managerId = customer.managerId;

    this.duraformEnquiry.invoiceTo = customer.invoiceTo;
    this.duraformEnquiry.invoiceAddress = customer.invoiceAddress;
    this.duraformEnquiry.invoiceSuburb = customer.invoiceSuburb;
    this.duraformEnquiry.invoiceState = customer.invoiceState;
    this.duraformEnquiry.invoicePostcode = customer.invoicePostcode;

    this.duraformEnquiry.deliveryTo = customer.deliveryTo;
    this.duraformEnquiry.deliveryAddress = customer.deliveryAddress;
    this.duraformEnquiry.deliverySuburb = customer.deliverySuburb;
    this.duraformEnquiry.deliveryState = customer.deliveryState;
    this.duraformEnquiry.deliveryPostcode = customer.deliveryPostcode;

    this.duraformEnquiry.updateDiscountRate(customer.discountRate);
  };

  setEdgeProfile = (model: DuraformEdgeProfileForList) => {
    this.duraformEnquiry.duraformEdgeProfileId = model.id;
    this.duraformEnquiry.duraformComponents.forEach((x) => {
      x.setEdgeProfile(model);
    });
  };

  setArch = (model: DuraformArchForList) => {
    this.duraformEnquiry.duraformArchId = model ? model.id : null;
  };

  addComponent = (
    component: DuraformComponentDto | DuraformMiscComponentDto
  ) => {
    if (component instanceof DuraformComponentDto) {
      if (this.duraformEnquiry.duraformComponents[0]) {
        component.sortNumber =
          this.duraformEnquiry.duraformComponents[0].sortNumber + 1;
      } else {
        component.sortNumber = 1;
      }

      this.duraformEnquiry.duraformComponents.unshift(component);
      return;
    }

    if (component instanceof DuraformMiscComponentDto) {
      this.duraformEnquiry.miscComponents.unshift(component);
    }
  };

  removeComponent = (
    component: DuraformComponentDto | DuraformMiscComponentDto
  ) => {
    if (component instanceof DuraformComponentDto) {
      const index = this.duraformEnquiry.duraformComponents.indexOf(component);

      if (index >= 0) {
        this.duraformEnquiry.duraformComponents.splice(index, 1);
      }
    }

    if (component instanceof DuraformMiscComponentDto) {
      const index = this.duraformEnquiry.miscComponents.indexOf(component);

      if (index >= 0) {
        this.duraformEnquiry.miscComponents.splice(index, 1);
      }
    }
  };

  // sendInQuote = () => {
  //   const url = `${environment.baseUrl}/DuraformQuotes`;
  //   const { duraformEnquiry } = this;

  //   const quote = plainToClass(
  //     DuraformQuoteDto,
  //     JSON.parse(JSON.stringify(duraformEnquiry))
  //   );
  //   quote.orderType = DuraformOrderTypeKey.Quote;

  //   return this.http.post<DuraformQuoteDto>(url, quote);
  // };

  loadNewDraft = () => {
    this.duraformEnquiry = new DuraformEnquiryDto();

    if (this.auth.isInRole(Role.CabinetMaker)) {
      this.setCustomer(this.auth.customer);
    }
  };
}
