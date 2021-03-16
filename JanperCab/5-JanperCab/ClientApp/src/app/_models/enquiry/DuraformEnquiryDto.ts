import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import { DuraformProcessDto } from './DuraformProcessDto';
import { DuraformMiscHeatStripDto } from './../duraform-misc-component/DuraformMiscHeatStripDto';
import { DuraformMiscFingerPullDto } from './../duraform-misc-component/DuraformMiscFingerPullDto';
import { DuraformMiscCapMouldDto } from './../duraform-misc-component/DuraformMiscCapMouldDto';
import { DuraformMiscLooseFoilDto } from './../duraform-misc-component/DuraformMiscLooseFoilDto';
import { DuraformAssetService } from './../../_services/duraform-asset.service';
import { Type } from 'class-transformer';
import * as _ from 'lodash';

import { DuraformFileDto } from '../application-file/DuraformFileDto';
import { DuraformComponentDto } from '../duraform-component/DuraformComponentDto';
import { DuraformComponentWithOptionAndHingeHoleDto } from '../duraform-component/DuraformComponentWithOptionAndHingeHoleDto';
import { DuraformDoorDto } from '../duraform-component/DuraformDoorDto';
import { DuraformDrawerDto } from '../duraform-component/DuraformDrawerDto';
import { DuraformEndPanelDto } from '../duraform-component/DuraformEndPanelDto';
import { DuraformPantryDoorDto } from '../duraform-component/DuraformPantryDoorDto';
import { DuraformDesignForOrderMenu } from '../duraform-design/DuraformDesignForOrderMenu';
import { EnquiryDto } from './EnquiryDto';
import { DuraformSerieForList } from '../duraform-serie/DuraformSerieForList';
import { DuraformWrapTypeForSelection } from '../duraform-wrap-type/DuraformWrapTypeForSelection';
import { DuraformWrapColorForSelection } from '../duraform-wrap-color/DuraformWrapColorForSelection';
import { HingeHoleTypeDto } from '../hinge-hole-type/HingeHoleTypeDto';
import { DuraformEdgeProfileForList } from '../duraform-edge-profile/DuraformEdgeProfileForList';
import { DuraformArchForList } from '../duraform-arch/DuraformArchForList';
import { DuraformComponentWithOptionDto } from '../duraform-component/DuraformComponentWithOptionDto';
import { DuraformOptionTypeKey } from 'src/app/_enums/DuraformOptionTypeKey';
import { DuraformMiscComponentDto } from '../duraform-misc-component/DuraformMiscComponentDto';

export class DuraformEnquiryDto extends EnquiryDto {
  duraformDesignId: number;
  duraformSerieId: number;
  isRoutingOnly: boolean;
  duraformWrapTypeId: number;
  duraformWrapColorId: number;
  duraformEdgeProfileId: number;
  hingeHoleTypeId: number;
  duraformArchId: number;

  @Type(() => DuraformComponentDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformDoorDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformDoorDto, 3-Application',
        },
        {
          value: DuraformPantryDoorDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformPantryDoorDto, 3-Application',
        },
        {
          value: DuraformEndPanelDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformEndPanelDto, 3-Application',
        },
        {
          value: DuraformDrawerDto,
          name:
            '_3_Application.Dtos.DuraformComponent.DuraformDrawerDto, 3-Application',
        },
      ],
    },
  })
  duraformComponents: DuraformComponentDto[] = [];

  @Type(() => DuraformMiscComponentDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformMiscLooseFoilDto,
          name:
            '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscLooseFoilDto, 3-Application',
        },
        {
          value: DuraformMiscCapMouldDto,
          name:
            '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscCapMouldDto, 3-Application',
        },
        {
          value: DuraformMiscFingerPullDto,
          name:
            '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscFingerPullDto, 3-Application',
        },
        {
          value: DuraformMiscHeatStripDto,
          name:
            '_3_Application.Dtos.DuraformMiscComponent.DuraformMiscHeatStripDto, 3-Application',
        },
      ],
    },
  })
  miscComponents: DuraformMiscComponentDto[] = [];
  duraformFiles: DuraformFileDto[] = [];
  duraformProcesses: DuraformProcessDto[] = [];

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.Enquiry.DuraformEnquiryDto, 3-Application';
  }

  get hasComponent(): boolean {
    return this.duraformComponents.length > 0 || this.miscComponents.length > 0;
  }

  get componentsWithOption(): DuraformComponentWithOptionDto[] {
    const components = this.duraformComponents.filter(
      (x) => x instanceof DuraformComponentWithOptionDto && x.duraformOption
    );

    return components as DuraformComponentWithOptionDto[];
  }

  get componentsWithHingeHole(): DuraformComponentWithOptionAndHingeHoleDto[] {
    const components = this.duraformComponents.filter(
      (x) =>
        x instanceof DuraformComponentWithOptionAndHingeHoleDto &&
        x.hingeHoleOption
    );

    return components as DuraformComponentWithOptionAndHingeHoleDto[];
  }

  get componentsWithDoubleSidedOption(): DuraformComponentWithOptionDto[] {
    const components = this.componentsWithOption;

    return components.filter(
      (x) =>
        x.duraformOption.duraformOptionTypeId ===
        DuraformOptionTypeKey.DoubleSided
    );
  }

  get duraformDoors(): DuraformDoorDto[] {
    const doors = this.duraformComponents.filter(
      (x) => x instanceof DuraformDoorDto
    );

    return _.orderBy(doors, ['sortNumber'], ['asc']) as DuraformDoorDto[];
  }

  get pantryDoors(): DuraformPantryDoorDto[] {
    const pantryDoors = this.duraformComponents.filter(
      (x) => x instanceof DuraformPantryDoorDto
    );

    return _.orderBy(
      pantryDoors,
      ['sortNumber'],
      ['asc']
    ) as DuraformPantryDoorDto[];
  }

  get endPanels(): DuraformEndPanelDto[] {
    const endPanels = this.duraformComponents.filter(
      (x) => x instanceof DuraformEndPanelDto
    );

    return _.orderBy(
      endPanels,
      ['sortNumber'],
      ['asc']
    ) as DuraformEndPanelDto[];
  }

  get duraformDrawers(): DuraformDrawerDto[] {
    const drawers = this.duraformComponents.filter(
      (x) => x instanceof DuraformDrawerDto
    );

    return _.orderBy(drawers, ['sortNumber'], ['asc']) as DuraformDrawerDto[];
  }

  get looseFoils(): DuraformMiscLooseFoilDto[] {
    const looseFoils = this.miscComponents.filter(
      (x) => x instanceof DuraformMiscLooseFoilDto
    );

    return looseFoils as DuraformMiscLooseFoilDto[];
  }

  get cabMoulds(): DuraformMiscCapMouldDto[] {
    const capMoulds = this.miscComponents.filter(
      (x) => x instanceof DuraformMiscCapMouldDto
    );

    return capMoulds as DuraformMiscCapMouldDto[];
  }

  get fingerPulls(): DuraformMiscFingerPullDto[] {
    const fingerPulls = this.miscComponents.filter(
      (x) => x instanceof DuraformMiscFingerPullDto
    );

    return fingerPulls as DuraformMiscFingerPullDto[];
  }

  get heatStrips(): DuraformMiscHeatStripDto[] {
    const heatStrips = this.miscComponents.filter(
      (x) => x instanceof DuraformMiscHeatStripDto
    );

    return heatStrips as DuraformMiscHeatStripDto[];
  }

  get duraformDesign(): DuraformDesignForOrderMenu {
    return DuraformAssetService.instance.getDesign(this.duraformDesignId);
  }

  get duraformSerie(): DuraformSerieForList {
    return DuraformAssetService.instance.getDoorSerie(this.duraformSerieId);
  }

  get duraformWrapType(): DuraformWrapTypeForSelection {
    return DuraformAssetService.instance.getWrapType(this.duraformWrapTypeId);
  }

  get duraformWrapColor(): DuraformWrapColorForSelection {
    return DuraformAssetService.instance.getWrapColor(this.duraformWrapColorId);
  }

  get hingeHoleType(): HingeHoleTypeDto {
    return DuraformAssetService.instance.getHingeType(this.hingeHoleTypeId);
  }

  get duraformEdgeProfile(): DuraformEdgeProfileForList {
    return DuraformAssetService.instance.getEdgeProfile(
      this.duraformEdgeProfileId
    );
  }

  get duraformArch(): DuraformArchForList {
    return DuraformAssetService.instance.getArch(this.duraformArchId);
  }

  get subTotal(): number {
    let total = 0;

    this.duraformComponents.forEach((x) => (total += x.price));
    this.miscComponents.forEach((x) => (total += x.price));

    return total;
  }

  get gst(): number {
    return _.round(this.subTotal / 10, 2);
  }

  get status(): DuraformProcessEnum {
    const status = this.duraformProcesses.find((x) => x.completedDate);

    return status ? status.process : DuraformProcessEnum.Ordered;
  }

  get statusDescription(): string {
    switch (this.status) {
      case DuraformProcessEnum.Ordered:
        return 'Ordered';
      case DuraformProcessEnum.PreRoute:
        return 'Pre Route';
      case DuraformProcessEnum.Routing:
        return 'Routing';
      case DuraformProcessEnum.Routed:
        return 'Routed';
      case DuraformProcessEnum.Pressing:
        return 'Pressing';
      case DuraformProcessEnum.Pressed:
        return 'Pressed';
      case DuraformProcessEnum.Cleaned:
        return 'Cleaned';
      case DuraformProcessEnum.Packed:
        return 'Packed';
      case DuraformProcessEnum.PickedUp:
        return 'Picked Up';
      case DuraformProcessEnum.Delivered:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  }

  calculatePrice = (): void => {
    this.totalPrice = this.subTotal + this.gst;
  };
}
