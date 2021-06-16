import { Type } from 'class-transformer';
import { DeliveryMethodEnum } from 'src/app/_enums/DeliveryMethodEnum';
import { CabinetMakerDto } from '../customer/CabinetMakerDto';
import { CustomerDto } from '../customer/CustomerDto';
import { DistributorDto } from '../customer/DistributorDto';
import { ManufacturerDto } from '../customer/ManufacturerDto';
import { DeliverySheetDto } from './DeliverySheetDto';

export class PickUpSheetDto extends DeliverySheetDto {
  static readonly BARCODE_PREFIX: string = 'PK';

  customerId: number;

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

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DeliverySheet.PickUpSheetDto, 3-Application';
    this.deliveryMethod = DeliveryMethodEnum.PickUp;
  }

  getDescription(): string {
    return `Picked Up By ${this.customer.name}`;
  }

  getBarcodePrefix() {
    return PickUpSheetDto.BARCODE_PREFIX;
  }
}
