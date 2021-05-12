export class CabinetMakerSearchFilterValues {
  search: string;
  sortBy: 'name' | 'type' | 'email' | 'invoice' | 'delivery';
  direction: 'asc' | 'desc';
  page: number;
  take: 10 | 20 | 50 | 100;

  constructor() {
    this.search = '';
    this.sortBy = 'name';
    this.direction = 'asc';
    this.page = 0;
    this.take = 20;
  }
}
