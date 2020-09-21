import { OrderStatus } from './../../_enums/OrderStatus';
export class DuraformOrderForListDto {
  id: string;
  orderNumber: number;
  customerOrderNumber: string;
  orderStatus: OrderStatus;
  distributorId: number;
  cabinetMakerId: number;
  distributorName: string;
  cabinetMakerName: string;
  description: string;
  createdDate: Date;
}
