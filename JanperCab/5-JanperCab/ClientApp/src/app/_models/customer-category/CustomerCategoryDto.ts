import { CustomerCategoryType } from './../../_enums/CustomerCategoryType';

export abstract class CustomerCategoryDto {
  $type: string;
  id: number;
  categoryType: CustomerCategoryType;

  abstract get description(): string;

  constructor() {
    this.$type = '';
  }
}
