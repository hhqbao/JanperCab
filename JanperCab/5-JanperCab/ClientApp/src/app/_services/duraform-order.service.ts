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
import { map } from 'rxjs/operators';
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

@Injectable({ providedIn: 'root' })
export class DuraformOrderService {
  private duraformForm: DuraformFormDto;

  constructor(private http: HttpClient, private asset: DuraformAssetService) {
    this.duraformForm = new DuraformDraftDto();
  }

  get customerOrderNumber(): string {
    return this.duraformForm.customerOrderNumber;
  }

  set customerOrderNumber(orderNumber: string) {
    this.duraformForm.customerOrderNumber = orderNumber;
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
    this.duraformForm.duraformComponents.unshift(component);
  };

  removeComponent = (component: DuraformComponentDto) => {
    const index = this.duraformForm.duraformComponents.indexOf(component);

    if (index >= 0) {
      this.duraformForm.duraformComponents.splice(index, 1);
    }
  };

  loadDraft = (id: string) => {
    const url = `${environment.baseUrl}/DuraformDrafts/${id}`;

    return this.http.get<DuraformDraftDto>(url).pipe(
      map((response) => {
        this.duraformForm = plainToClass(DuraformDraftDto, response);
        console.log(this.duraformForm);
      })
    );
  };

  saveDraft = () => {
    const url = `${environment.baseUrl}/DuraformDrafts`;
    const { duraformForm } = this;

    if (duraformForm.id) {
      console.log(duraformForm);
      return this.http
        .put<DuraformDraftDto>(`${url}/${duraformForm.id}`, duraformForm)
        .pipe(
          map((response) => {
            this.duraformForm = plainToClass(DuraformDraftDto, response);

            return this.duraformForm;
          })
        );
    } else {
      return this.http.post<DuraformDraftDto>(`${url}`, duraformForm).pipe(
        map((response) => {
          this.duraformForm = plainToClass(DuraformDraftDto, response);

          return this.duraformForm;
        })
      );
    }
  };

  reset = () => {
    this.duraformForm = new DuraformDraftDto();
  };
}
