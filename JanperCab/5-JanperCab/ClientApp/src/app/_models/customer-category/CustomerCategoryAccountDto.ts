import { CustomerCategoryType } from 'src/app/_enums/CustomerCategoryType';
import { CustomerCategoryDto } from './CustomerCategoryDto';

export class CustomerCategoryAccountDto extends CustomerCategoryDto {
  durationInDays: number;

  constructor() {
    super();
    this.$type =
      '_3_Application.Dtos.CustomerCategory.CustomerCategoryAccountDto, 3-Application';
    this.categoryType = CustomerCategoryType.Account;
  }

  get description(): string {
    return `Account - ${this.durationInDays} days`;
  }
}
