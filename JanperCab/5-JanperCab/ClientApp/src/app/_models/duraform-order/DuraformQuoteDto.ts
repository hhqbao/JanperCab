import { DuraformFormDto } from './DuraformFormDto';
import { QuoteStatus } from 'src/app/_enums/QuoteStatus';
import { DuraformOrderTypeKey } from 'src/app/_enums/DuraformOrderTypeKey';

export class DuraformQuoteDto extends DuraformFormDto {
  quoteNumber: number;
  quoteStatus: QuoteStatus;

  constructor() {
    super();
    this.orderType = DuraformOrderTypeKey.Quote;
  }
}
