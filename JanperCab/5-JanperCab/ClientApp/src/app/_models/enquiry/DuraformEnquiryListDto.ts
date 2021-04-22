import { DuraformProcessDto } from '../DuraformProcess/DuraformProcessDto';
import { DistributorDto } from './../customer/DistributorDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { DuraformProcessEnum } from 'src/app/_enums/DuraformProcessEnum';
import * as moment from 'moment';
import { Type } from 'class-transformer';
import { DuraformProcessCleaningDto } from '../DuraformProcess/DuraformProcessCleaningDto';
import { DuraformProcessDeliveringDto } from '../DuraformProcess/DuraformProcessDeliveringDto';
import { DuraformProcessPackingDto } from '../DuraformProcess/DuraformProcessPackingDto';
import { DuraformProcessPickingUpDto } from '../DuraformProcess/DuraformProcessPickingUpDto';
import { DuraformProcessPreRouteDto } from '../DuraformProcess/DuraformProcessPreRouteDto';
import { DuraformProcessPressingDto } from '../DuraformProcess/DuraformProcessPressingDto';
import { DuraformProcessRoutingDto } from '../DuraformProcess/DuraformProcessRoutingDto';

export class DuraformEnquiryListDto {
  id: number;
  createdDate: Date;
  lastEditted: Date;
  orderedDate: Date;
  approvedDate: Date;
  isRoutingOnly: boolean;
  customerReference: string;
  cabinetMaker: CabinetMakerDto;
  distributor: DistributorDto;
  deliveryNote: string;
  hasBeenInvoiced: boolean;

  @Type(() => DuraformProcessDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: DuraformProcessPreRouteDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessPreRouteDto, 3-Application',
        },
        {
          value: DuraformProcessRoutingDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessRoutingDto, 3-Application',
        },
        {
          value: DuraformProcessPressingDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessPressingDto, 3-Application',
        },
        {
          value: DuraformProcessCleaningDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessCleaningDto, 3-Application',
        },
        {
          value: DuraformProcessPackingDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessPackingDto, 3-Application',
        },
        {
          value: DuraformProcessPickingUpDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessPickingUpDto, 3-Application',
        },
        {
          value: DuraformProcessDeliveringDto,
          name:
            '_3_Application.Dtos.Process.DuraformProcessDeliveringDto, 3-Application',
        },
      ],
    },
  })
  duraformProcesses: DuraformProcessDto[] = [];

  get timeInSystem(): string {
    const offset = moment().diff(moment(this.orderedDate), 'days');

    return `${offset} day${offset > 1 ? 's' : ''}`;
  }

  get currentStatus(): DuraformProcessDto {
    const status = this.duraformProcesses.find((x) => x.isCurrent);

    return status;
  }

  get statusDescription(): string {
    if (!this.currentStatus) {
      return 'Ordered';
    }

    if (this.hasBeenInvoiced) {
      return 'Invoiced';
    }

    return this.currentStatus.getStatus();
  }
}
