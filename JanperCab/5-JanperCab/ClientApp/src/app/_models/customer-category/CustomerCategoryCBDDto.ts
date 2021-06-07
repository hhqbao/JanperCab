import { CustomerCategoryType } from 'src/app/_enums/CustomerCategoryType';
import { CustomerCategoryDto } from './CustomerCategoryDto';

export class CustomerCategoryCBDDto extends CustomerCategoryDto {
  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.CustomerCategory.CustomerCategoryCBDDto, 3-Application';
    this.categoryType = CustomerCategoryType.CBD;
  }

  get description(): string {
    return 'CBD';
  }
}
