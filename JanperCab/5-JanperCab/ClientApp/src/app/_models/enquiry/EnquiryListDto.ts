import { ManufacturerDto } from '../customer/ManufacturerDto';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { DistributorDto } from '../customer/DistributorDto';
import { CabinetMakerDto } from 'src/app/_models/customer/CabinetMakerDto';
import { Type } from 'class-transformer';
import { ProcessCleaningDto } from '../process/ProcessCleaningDto';
import { ProcessDeliveringDto } from '../process/ProcessDeliveringDto';
import { ProcessPackingDto } from '../process/ProcessPackingDto';
import { ProcessPreRouteDto } from '../process/ProcessPreRouteDto';
import { ProcessPressingDto } from '../process/ProcessPressingDto';
import { ProcessRoutingDto } from '../process/ProcessRoutingDto';
import { ProcessDto } from '../process/ProcessDto';
import { ProcessTypeEnum } from 'src/app/_enums/ProcessTypeEnum';

export class EnquiryListDto {
  id: number;
  createdDate: Date;
  daysInSystem: number;
  lastEditted: Date;
  orderedDate: Date;
  approvedDate: Date;
  jobType: string;
  doorType: string;
  doorColour: string;
  customerReference: string;
  totalPrice: number;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
      ],
    },
  })
  customer: CustomerDto;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
      ],
    },
  })
  manager: CustomerDto;

  deliveryNote: string;
  hasBeenDelivered: boolean;
  hasBeenInvoiced: boolean;

  @Type(() => ProcessDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: ProcessPreRouteDto,
          name: '_3_Application.Dtos.Process.ProcessPreRouteDto, 3-Application',
        },
        {
          value: ProcessRoutingDto,
          name: '_3_Application.Dtos.Process.ProcessRoutingDto, 3-Application',
        },
        {
          value: ProcessPressingDto,
          name: '_3_Application.Dtos.Process.ProcessPressingDto, 3-Application',
        },
        {
          value: ProcessCleaningDto,
          name: '_3_Application.Dtos.Process.ProcessCleaningDto, 3-Application',
        },
        {
          value: ProcessPackingDto,
          name: '_3_Application.Dtos.Process.ProcessPackingDto, 3-Application',
        },
        {
          value: ProcessDeliveringDto,
          name: '_3_Application.Dtos.Process.ProcessDeliveringDto, 3-Application',
        },
      ],
    },
  })
  processes: ProcessDto[];

  get currentStatus(): ProcessDto {
    if (!this.processes) {
      return null;
    }

    const status = this.processes.find((x) => x.isCurrent);

    return status;
  }

  get statusDescription(): string {
    if (!this.currentStatus) {
      return 'Ordered';
    }

    return this.currentStatus.getStatus();
  }

  get isCompleted(): boolean {
    return this.hasBeenDelivered && this.hasBeenInvoiced;
  }
}
