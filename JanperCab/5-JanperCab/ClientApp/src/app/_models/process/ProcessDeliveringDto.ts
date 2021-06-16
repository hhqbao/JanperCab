import { DeliveryMethodEnum } from 'src/app/_enums/DeliveryMethodEnum';
import { DeliverySheetDto } from '../delivery-sheet/DeliverySheetDto';
import { ProcessDto } from './ProcessDto';

export class ProcessDeliveringDto extends ProcessDto {
  deliverySheetId: number;

  deliverySheet: DeliverySheetDto;

  getStatus(): string {
    if (this.startTime && this.endTime) {
      switch (this.deliverySheet.deliveryMethod) {
        case DeliveryMethodEnum.Shipping:
          return 'Shipped';
        case DeliveryMethodEnum.PickUp:
          return 'Picked Up';
        default:
          return 'Unknown Method';
      }
    }

    switch (this.deliverySheet.deliveryMethod) {
      case DeliveryMethodEnum.Shipping:
        return 'Shipping';
      case DeliveryMethodEnum.PickUp:
        return 'Picking Up';
      default:
        return 'Unknown Method';
    }
  }
}
