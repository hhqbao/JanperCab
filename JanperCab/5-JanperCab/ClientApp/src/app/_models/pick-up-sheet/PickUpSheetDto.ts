import { Type } from 'class-transformer';
import { CustomerDto } from 'src/app/_models/customer/CustomerDto';
import { CabinetMakerDto } from '../customer/CabinetMakerDto';
import { DistributorDto } from '../customer/DistributorDto';
import { ManufacturerDto } from '../customer/ManufacturerDto';
export class PickUpSheetDto {
  static readonly BARCODE_PREFIX: string = 'PK';

  id: number;
  createdDate: Date;
  isCompleted: boolean;
  customerId: number;
  applicationUserId: number;

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

  getBarcodePrefix(): string {
    return PickUpSheetDto.BARCODE_PREFIX;
  }
}
