import { TruckDto } from './../truck/TruckDto';
import { DriverDto } from './../driver/DriverDto';
import { DeliverySheetDto } from './DeliverySheetDto';
import { DeliveryPatchDto } from './DeliveryPatchDto';
import { Type } from 'class-transformer';
import { DeliveryMethodEnum } from 'src/app/_enums/DeliveryMethodEnum';

export class ShippingSheetDto extends DeliverySheetDto {
  static readonly BARCODE_PREFIX: string = 'RS';

  driverId: number;
  truckId: number;

  @Type(() => DriverDto)
  driver: DriverDto;

  @Type(() => TruckDto)
  truck: TruckDto;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.DeliverySheet.ShippingSheetDto, 3-Application';
    this.deliveryMethod = DeliveryMethodEnum.Shipping;
  }

  getBarcodePrefix() {
    return ShippingSheetDto.BARCODE_PREFIX;
  }

  getDescription(): string {
    return `${this.driver.fullName} - ${this.truck.plateNumber}`;
  }

  getPatchDetails = (): DeliveryPatchDto[] => {
    const patches: DeliveryPatchDto[] = [];

    this.enquiriesForSheet.forEach((enquiry) => {
      const existPatch = patches.find((p) => p.hasSameAddress(enquiry));

      if (existPatch) {
        existPatch.enquiriesForSheet.push(enquiry);
      } else {
        patches.push(new DeliveryPatchDto(enquiry));
      }
    });

    return patches;
  };
}
