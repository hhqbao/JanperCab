import { HingeHoleTypeDto } from './../_models/hinge-hole-type/HingeHoleTypeDto';
import { DuraformWrapColorDto } from './../_models/duraform-wrap-color/DuraformWrapColorDto';
import { DuraformWrapTypeDto } from './../_models/duraform-wrap-type/DuraformWrapTypeDto';
import { DuraformSerieDto } from './../_models/duraform-serie/DuraformSerieDto';
import { DuraformDesignDto } from './../_models/duraform-design/DuraformDesignDto';
import { DuraformArchDto } from './../_models/duraform-arch/DuraformArchDto';
import { DuraformEdgeProfileDto } from './../_models/duraform-edge-profile/DuraformEdgeProfileDto';
import { Role } from './../_enums/Role';
import { DuraformComponentService } from 'src/app/_services/duraform-component.service';
import { DuraformMiscFingerPullDto } from './../_models/duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscCapMouldDto } from 'src/app/_models/duraform-misc-component/DuraformMiscCapMouldDto';
import { DuraformMiscLooseFoilDto } from 'src/app/_models/duraform-misc-component/DuraformMiscLooseFoilDto';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { DuraformEnquiryDto } from './../_models/enquiry/DuraformEnquiryDto';
import { AuthService } from './auth.service';
import { DuraformAssetService } from './duraform-asset.service';
import { StepOneReturnValue } from '../_models/duraform-order/StepOneReturnValue';
import { Injectable } from '@angular/core';
import { DuraformComponentDto } from '../_models/duraform-component/DuraformComponentDto';
import { DuraformComponentWithOptionDto } from '../_models/duraform-component/DuraformComponentWithOptionDto';
import { CustomerDto } from '../_models/customer/CustomerDto';
import { CustomerCategoryType } from '../_enums/CustomerCategoryType';
import { EnquiryPaymentType } from '../_enums/EnquiryPaymentType';

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
    this.setDuraformDesign(model.design);
    this.setEdgeProfile(model.edgeProfile);
    this.setDuraformSerie(model.serie);
    this.setArch(model.arch);
    this.setWrapType(model.wrapType);
    this.setWrapColor(model.wrapColor);

    this.duraformEnquiry.isRoutingOnly = model.isRoutingOnly;

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
    this.duraformEnquiry.customer = customer;

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
    this.duraformEnquiry.deliveryFee = customer.deliveryFee;

    switch (customer.customerCategory.categoryType) {
      case CustomerCategoryType.Account:
        this.duraformEnquiry.enquiryPaymentType = EnquiryPaymentType.Account;
        break;
      case CustomerCategoryType.CBD:
        this.duraformEnquiry.enquiryPaymentType = EnquiryPaymentType.CBD;
        this.duraformEnquiry.toBePriced = false;
        break;
    }

    this.duraformEnquiry.updateDiscountRate(customer.discountRate);
  };

  setChoiceOfBlackBoard = (choice: boolean) => {
    this.duraformEnquiry.useBlackBoard = choice;

    console.log(this.duraformEnquiry.useBlackBoard);
  };

  setDuraformDesign = (design: DuraformDesignDto) => {
    this.duraformEnquiry.duraformDesignId = design.id;
    this.duraformEnquiry.duraformDesign = design;
  };

  setDuraformSerie = (serie: DuraformSerieDto) => {
    this.duraformEnquiry.duraformSerieId = serie.id;
    this.duraformEnquiry.duraformSerie = serie;
  };

  setWrapType = (wrapType: DuraformWrapTypeDto) => {
    this.duraformEnquiry.duraformWrapTypeId = wrapType?.id;
    this.duraformEnquiry.duraformWrapType = wrapType;
  };

  setWrapColor = (wrapColor: DuraformWrapColorDto) => {
    this.duraformEnquiry.duraformWrapColorId = wrapColor?.id;
    this.duraformEnquiry.duraformWrapColor = wrapColor;
  };

  setEdgeProfile = (edgeProfile: DuraformEdgeProfileDto) => {
    this.duraformEnquiry.duraformEdgeProfileId = edgeProfile.id;
    this.duraformEnquiry.duraformEdgeProfile = edgeProfile;

    this.duraformEnquiry.duraformComponents.forEach((x) => {
      x.setEdgeProfile(edgeProfile);
    });
  };

  setArch = (duraformArch: DuraformArchDto) => {
    this.duraformEnquiry.duraformArchId = duraformArch?.id;
    this.duraformEnquiry.duraformArch = duraformArch;
  };

  setHingeHoleType = (hingeType: HingeHoleTypeDto) => {
    this.duraformEnquiry.hingeHoleTypeId = hingeType?.id;
    this.duraformEnquiry.hingeHoleType = hingeType;

    if (!this.duraformEnquiry.hingeHoleType) {
      const componentsWithHingeHole =
        this.duraformEnquiry.componentsWithHingeHole;

      componentsWithHingeHole.forEach((x) => (x.hingeHoleOption = null));
    }
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
