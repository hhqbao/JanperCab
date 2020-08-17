import { OrderStatus } from './../../_enums/OrderStatus';
import { DuraformFormDto } from './DuraformFormDto';
import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';

export class DuraformOrderDto extends DuraformFormDto {
  orderNumber: number;
  orderStatus: OrderStatus;

  constructor() {
    super();
    this.orderType = DuraformOrderTypeKey.Order;
  }
}
