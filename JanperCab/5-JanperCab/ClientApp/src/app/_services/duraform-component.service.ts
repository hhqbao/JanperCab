import { DuraformEnquiryDto } from 'src/app/_models/enquiry/DuraformEnquiryDto';
import { DialogService } from './dialog.service';
import { DuraformAssetService } from 'src/app/_services/duraform-asset.service';
import { DuraformDrawerDto } from './../_models/duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from './../_models/duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from './../_models/duraform-component/DuraformPantryDoorDto';
import { DuraformDoorDto } from './../_models/duraform-component/DuraformDoorDto';
import { environment } from 'src/environments/environment';
import { DuraformComponentTypeDto } from './../_models/duraform-component/DuraformComponentType';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DuraformComponentDto } from '../_models/duraform-component/DuraformComponentDto';
import { DuraformComponentWithOptionDto } from '../_models/duraform-component/DuraformComponentWithOptionDto';
import { ComponentType } from '../_enums/ComponentType';
import { DuraformMiscComponentDto } from '../_models/duraform-misc-component/DuraformMiscComponentDto';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class DuraformComponentService {
  static instance: DuraformComponentService;

  constructor(
    private http: HttpClient,
    private asset: DuraformAssetService,
    private dialog: DialogService
  ) {
    DuraformComponentService.instance = this;
  }

  getComponentTypes = () => {
    return this.http.get<DuraformComponentTypeDto[]>(
      `${environment.baseUrl}/DuraformComponents/GetTypes`
    );
  };

  generateComponent = (type: ComponentType) => {
    let component: DuraformComponentDto;

    switch (type) {
      case ComponentType.DuraformDoor:
        component = new DuraformDoorDto();
        break;
      case ComponentType.DuraformPantryDoor:
        component = new DuraformPantryDoorDto();
        break;
      case ComponentType.DuraformEndPanel:
        component = new DuraformEndPanelDto();
        break;
      case ComponentType.DuraformDrawer:
        component = new DuraformDrawerDto();
        break;
      default:
        this.dialog.alert(
          'Unsupported Object Type',
          'Component Type Not Supported! Please contact IT department.',
          null
        );
        return;
    }

    component.$type = this.asset.getComponentType(type).type;
    return component;
  };

  updateComponent = (
    component: DuraformComponentDto,
    duraformEnquiry: DuraformEnquiryDto,
    formValue: any
  ) => {
    if (component instanceof DuraformComponentWithOptionDto) {
      component.updateWithOption(formValue, this.asset.duraformOptionTypes);
    } else {
      component.update(formValue);
    }

    this.calculateComponentPrice(component, duraformEnquiry);
  };

  calculateComponentPrice = (
    component: DuraformComponentDto,
    duraformEnquiry: DuraformEnquiryDto
  ) => {
    let serieId = duraformEnquiry.duraformSerie.id;
    const discountRate = duraformEnquiry.discountRate;

    if (component instanceof DuraformComponentWithOptionDto) {
      if (component.duraformOption && component.duraformOption.hasNoProfile) {
        serieId = 1;
      }
    }

    component.unitPrice = component.getPriceForOne(serieId);
    component.subTotal = component.quantity * component.unitPrice;
    component.totalDiscount = _.round(
      (component.subTotal * discountRate) / 100,
      2
    );

    component.totalPrice = component.subTotal - component.totalDiscount;
  };

  calculateMiscItemPrice = (
    miscItem: DuraformMiscComponentDto,
    duraformEnquiry: DuraformEnquiryDto
  ) => {
    const unitPrice = miscItem.getUnitPrice(duraformEnquiry);

    miscItem.unitPrice = unitPrice;

    miscItem.subTotal = miscItem.unitPrice * miscItem.quantity;
    miscItem.totalDiscount = _.round(
      (miscItem.subTotal * duraformEnquiry.discountRate) / 100,
      2
    );

    miscItem.totalPrice = miscItem.subTotal - miscItem.totalDiscount;
  };
}
