import { DuraformProcessDto } from './DuraformProcessDto';
import { DistributorDto } from './../customer/DistributorDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import * as moment from 'moment';

export class DuraformEnquiryListDto {
  id: number;
  status: DuraformProcessEnum;
  createdDate: Date;
  lastEditted: Date;
  orderedDate: Date;
  approvedDate: Date;
  isRoutingOnly: boolean;
  customerReference: string;
  cabinetMaker: CabinetMakerDto;
  distributor: DistributorDto;
  deliveryNote: string;

  duraformProcesses: DuraformProcessDto[] = [];

  get timeInSystem(): string {
    const offset = moment().diff(moment(this.orderedDate), 'days');

    return `${offset} day${offset > 1 ? 's' : ''}`;
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
}
