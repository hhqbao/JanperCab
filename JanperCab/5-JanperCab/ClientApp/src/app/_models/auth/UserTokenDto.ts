import { CabinetMakerDto } from './../customer/CabinetMakerDto';
import { DistributorDto } from './../customer/DistributorDto';
import { ManufacturerDto } from './../customer/ManufacturerDto';
import { CustomerDto } from '../customer/CustomerDto';
import { Type } from 'class-transformer';

export class UserTokenDto {
  token: string;

  @Type(() => CustomerDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '$type',
      subTypes: [
        {
          value: ManufacturerDto,
          name: '_3_Application.Dtos.Customer.ManufacturerDto, 3-Application',
        },
        {
          value: DistributorDto,
          name: '_3_Application.Dtos.Customer.DistributorDto, 3-Application',
        },
        {
          value: CabinetMakerDto,
          name: '_3_Application.Dtos.Customer.CabinetMakerDto, 3-Application',
        },
      ],
    },
  })
  customer: CustomerDto;
}
