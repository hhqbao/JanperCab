export class OrderSearchFilterValues {
  customerId: number | string;
  search: string;
  status: string;
  sortBy:
    | 'orderNumber'
    | 'customerReference'
    | 'type'
    | 'customer'
    | 'description'
    | 'orderedDate';
  direction: 'asc' | 'desc';
  page: number;
  take: 10 | 20 | 50 | 100;

  constructor() {
    this.customerId = null;
    this.search = '';
    this.status = null;
    this.sortBy = 'orderedDate';
    this.direction = 'asc';
    this.page = 0;
    this.take = 20;
  }
}
