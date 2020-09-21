import { OrderStatus } from './../../_enums/OrderStatus';
export class OrderSearchFilterValues {
  customerId: number | string;
  search: string;
  status: OrderStatus;
  sortBy:
    | 'orderNumber'
    | 'customerOrderNumber'
    | 'orderStatus'
    | 'customer'
    | 'description'
    | 'createdDate';
  direction: 'asc' | 'desc';
  page: number;
  take: 10 | 20 | 50 | 100;

  constructor() {
    this.customerId = '0';
    this.search = '';
    this.status = null;
    this.sortBy = 'orderNumber';
    this.direction = 'asc';
    this.page = 0;
    this.take = 20;
  }
}
