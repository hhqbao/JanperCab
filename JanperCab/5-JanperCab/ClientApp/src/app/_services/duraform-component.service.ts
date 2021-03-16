import { DialogService } from './dialog.service';
import { DuraformOrderService } from './duraform-order.service';
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

@Injectable({ providedIn: 'root' })
export class DuraformComponentService {
  constructor(
    private http: HttpClient,
    private asset: DuraformAssetService,
    private order: DuraformOrderService,
    private dialog: DialogService
  ) {}

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

  updateComponent = (component: DuraformComponentDto, formValue: any) => {
    if (component instanceof DuraformComponentWithOptionDto) {
      component.updateWithOption(formValue, this.asset.duraformOptionTypes);
    } else {
      component.update(formValue);
    }

    this.calculateComponentPrice(component);
  };

  calculateComponentPrice = (component: DuraformComponentDto) => {
    let serieId = this.order.duraformEnquiry.duraformSerie.id;

    if (component instanceof DuraformComponentWithOptionDto) {
      if (component.duraformOption && component.duraformOption.hasNoProfile) {
        serieId = 1;
      }
    }

    component.price = component.quantity * component.getPriceForOne(serieId);
  };
}
