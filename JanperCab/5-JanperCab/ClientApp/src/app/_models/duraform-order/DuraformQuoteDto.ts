import { DuraformFormDto } from './DuraformFormDto';
import { QuoteStatus } from 'src/app/_enums/QuoteStatus';
import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';

export class DuraformQuoteDto extends DuraformFormDto {
  quoteNumber: number;
  quoteStatus: QuoteStatus;
  totalPrice: number;

  constructor() {
    super();
    this.orderType = DuraformOrderTypeKey.Quote;
  }
}
